# Grønli Registrar Database System

A comprehensive document registration and notarization system prototype designed for sovereign trust and governance. 

This project includes both frontend and backend components for managing documents with legal and notarial relevance, featuring key governance roles.

---

## Live Demo

Check out the live frontend demo here:  
[https://groenli-registrar.tiiny.site/](https://groenli-registrar.tiiny.site/)

---

## Features

### Frontend
- Intuitive document registration form  
- Drag & drop file uploads for cover pages, seals, and notarized signatures  
- Document status workflow:
- *Under behandling* → *Komplett* → *Arkivert*  
- Visual list of all registered documents with detailed metadata  
- Key role display for governance:  
  - Grantor / Settlor (Kim Terje Rudschinat Grønli)  
  - Trustee (Grønli Court of Records)  
  - Authorized Signatory / Executor (Kim-Terje Rudschinat Grønli)
 
  - Key Features:
🔐 Three Key Roles Integration

Grantor/Settlor: Kim Terje Rudschinat Grønli (PC-FN-3849, KTR-2025)
Trustee: Grønli Court of Records (NP-2025)
Authorized Signatory: Kim-Terje Rudschinat Grønli (NP-2025)

📄 Document Registration System

Title and series number tracking
Jurisdiction selection (Grønli Court of Records, Sovereign House, AKFNS)
Received by tracking with the key roles
Status management (Under behandling → Komplett → Arkivert)

📎 File Management

Cover Page upload (PDF, images)
Seal/Stamp upload (images)
Notarisk signatur upload (PDF, images)
Drag & drop functionality for easy file handling

🏛️ Notarization Process

One-click notarization with date stamping
Status progression tracking
Archive functionality

📋 Document Archive

Visual list of all registered documents
Status indicators with color coding
File attachment tracking (✅/❌ indicators)
Document details display

How to Use:

Register Document: Fill in title, series number (like PC-FN-3849), select jurisdiction and receiver
Upload Files: Drag & drop or click to upload cover page, seal, and signature
Notarize: Click "Notariser Dokument" to complete the notarization process
Archive: Click "Arkiver Dokument" to move to archived status

The system includes sample data (Proof of Life with PC-FN-3849) and is fully functional as a prototype. All data is stored in memory for this demo version, but the structure is designed to easily connect to a SQL database using the table schemas from your document.

### Backend
- REST API built with Node.js and Express  
- PostgreSQL database integration with schema and sample data  
- JWT authentication and authorization  
- Secure file upload and management  
- Role-based access control aligned with sovereign governance model  
- Endpoints for document management, notarization, and archival

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)  
- PostgreSQL database  
- npm package manager  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/automagicknight/groenli-registrar.git
   cd groenli-registrar
Install dependencies:

bash
Copy
Edit
npm install
Set up your environment variables:
Copy .env.example to .env and update with your database credentials and JWT secret.

bash
Copy
Edit
cp .env.example .env
Create your PostgreSQL database (e.g., groenli_registrar) and run schema and sample data SQL scripts:

bash
Copy
Edit
psql -d groenli_registrar -f sql/schema.sql
psql -d groenli_registrar -f sql/sample_data.sql
Start the backend server:

bash
Copy
Edit
npm start
Open index.html in your browser or deploy it to a static hosting service and configure it to connect to your backend API.

API Documentation
The backend exposes RESTful API endpoints under /api with JWT authentication.

Refer to API Documentation for detailed information on available routes, request/response formats, and authentication.

Project Structure
pgsql
Copy
Edit
groenli-registrar/
├── index.html          # Frontend application
├── package.json        # Node.js dependencies and scripts
├── server.js           # Express backend server
├── .env.example        # Environment variable example
├── sql/
│   ├── schema.sql      # Database schema definitions
│   └── sample_data.sql # Sample data to initialize the database
├── README.md           # This file
└── LICENSE             # MIT License
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
Make sure to follow the existing coding style and provide clear commit messages.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or support, please reach out to Kim Terje Rudschinat Grønli or open an issue on GitHub.

Developed with sovereignty and trust in mind.

yaml
Copy
Edit

---








# Grønli Registrar Database System

A comprehensive document registration and notarization system prototype designed for sovereign trust and governance. This project includes both frontend and backend components for managing documents with legal and notarial relevance, featuring key governance roles.

---

## Live Demo

Check out the live frontend demo here:  
[https://groenli-registrar.tiiny.site/](https://groenli-registrar.tiiny.site/)

---

## Features

### Frontend
- Intuitive document registration form  
- Drag & drop file uploads for cover pages, seals, and notarized signatures  
- Document status workflow:
- *Under behandling* → *Komplett* → *Arkivert*
   
- Visual list of all registered documents with detailed metadata  
- Key role display for governance:  
  - Grantor / Settlor (Kim Terje Rudschinat Grønli)  
  - Trustee (Grønli Court of Records)  
  - Authorized Signatory / Executor (Kim-Terje Rudschinat Grønli)  

### Backend
- REST API built with Node.js and Express  
- PostgreSQL database integration with schema and sample data  
- JWT authentication and authorization  
- Secure file upload and management  
- Role-based access control aligned with sovereign governance model  
- Endpoints for document management, notarization, and archival

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)  
- PostgreSQL database  
- npm package manager  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/automagicknight/groenli-registrar.git
   cd groenli-registrar
Install dependencies:

bash
Copy
Edit
npm install
Set up your environment variables:
Copy .env.example to .env and update with your database credentials and JWT secret.

bash
Copy
Edit
cp .env.example .env
Create your PostgreSQL database (e.g., groenli_registrar) and run schema and sample data SQL scripts:

bash
Copy
Edit
psql -d groenli_registrar -f sql/schema.sql
psql -d groenli_registrar -f sql/sample_data.sql
Start the backend server:

bash
Copy
Edit
npm start
Open index.html in your browser or deploy it to a static hosting service and configure it to connect to your backend API.

API Documentation
The backend exposes RESTful API endpoints under /api with JWT authentication.
Refer to API Documentation for detailed information on available routes, request/response formats, and authentication.

Project Structure
pgsql
Copy
Edit
groenli-registrar/
├── index.html          # Frontend application
├── package.json        # Node.js dependencies and scripts
├── server.js           # Express backend server
├── .env.example        # Environment variable example
├── sql/
│   ├── schema.sql      # Database schema definitions
│   └── sample_data.sql # Sample data to initialize the database
├── README.md           # This file
└── LICENSE             # MIT License
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
Make sure to follow the existing coding style and provide clear commit messages.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or support, please reach out to Kim Terje Rudschinat Grønli or open an issue on GitHub.

Developed with sovereignty and trust in mind.

yaml
Copy
Edit

---

If you want, I can help you draft the `API_DOCUMENTATION.md` or add example usage with Postman too!






