import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
const tokenExpiry = process.env.TOKEN_EXPIRY || '1h';

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware: Authenticate JWT token and set req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // { id, username, role }
    next();
  });
}

// Middleware: Role-based access control
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied' });
    next();
  };
}

// -- Authentication Routes --

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rowCount === 0) return res.status(400).json({ error: 'Invalid username or password' });

    const user = result.rows[0];
    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) return res.status(400).json({ error: 'Invalid username or password' });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -- Health check endpoint, no auth required
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// -- Protected API routes --
// Use authenticateToken middleware on all routes below

// GET /api/documents
app.get('/api/documents', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM documents ORDER BY received_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents
app.post('/api/documents', authenticateToken, authorizeRoles('admin', 'user'), async (req, res) => {
  try {
    const { title, seriesId, jurisdiction, receivedBy, notes } = req.body;
    const query = `INSERT INTO documents (title, series_id, jurisdiction, received_by, notes) 
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, seriesId, jurisdiction, receivedBy, notes];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/:id/upload
app.post('/api/documents/:id/upload', authenticateToken, authorizeRoles('admin', 'user'), upload.single('file'), async (req, res) => {
  try {
    const documentId = req.params.id;
    const { fileType } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const query = `INSERT INTO document_files (document_id, file_type, file_name, file_path) 
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [documentId, fileType, req.file.originalname, req.file.path];
    await pool.query(query, values);

    const flagColumn = fileType === 'coverPage' ? 'has_cover_page' : 
                       fileType === 'seal' ? 'has_seal' : 
                       fileType === 'signature' ? 'has_signature' : null;
    if(flagColumn) {
      await pool.query(`UPDATE documents SET ${flagColumn} = TRUE WHERE id = $1`, [documentId]);
    }

    res.json({ message: 'File uploaded and document updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/:id/notarize
app.post('/api/documents/:id/notarize', authenticateToken, authorizeRoles('admin', 'user'), async (req, res) => {
  try {
    const documentId = req.params.id;
    const notaryDate = new Date();

    const query = `UPDATE documents SET status = 'Komplett', notary_date = $1 WHERE id = $2 RETURNING *`;
    const result = await pool.query(query, [notaryDate, documentId]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/:id/archive
app.post('/api/documents/:id/archive', authenticateToken, authorizeRoles('admin', 'user'), async (req, res) => {
  try {
    const documentId = req.params.id;
    const query = `UPDATE documents SET status = 'Arkivert' WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [documentId]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/roles
app.get('/api/roles', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT roles.*, persons.full_name 
      FROM roles 
      LEFT JOIN persons ON roles.person_id = persons.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Helper route to create admin user (only for initial setup, disable in prod)
app.post('/api/create-admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id';
    const result = await pool.query(query, [username, hashed, 'admin']);
    res.json({ message: 'Admin created', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Grønli Registrar API running on port ${port}`);
});
