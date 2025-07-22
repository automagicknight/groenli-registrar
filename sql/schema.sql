-- Users table for authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Persons table
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  alias VARCHAR(255),
  fingerprint TEXT,
  role VARCHAR(100),
  signature TEXT
);

-- Documents table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  series_id VARCHAR(100) NOT NULL,
  jurisdiction VARCHAR(255),
  received_by VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'Under behandling',
  received_date DATE DEFAULT CURRENT_DATE,
  notary_date DATE,
  has_cover_page BOOLEAN DEFAULT FALSE,
  has_seal BOOLEAN DEFAULT FALSE,
  has_signature BOOLEAN DEFAULT FALSE
);

-- Document files table
CREATE TABLE document_files (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
  file_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(100) NOT NULL,
  person_id INTEGER REFERENCES persons(id),
  notes TEXT
);
