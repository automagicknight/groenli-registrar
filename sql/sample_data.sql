-- Create an admin user with password 'AdminPass2025!' (hashed)
INSERT INTO users (username, password_hash, role) VALUES (
  'admin',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8dG6mB8JUr40O49qqd2Tl7NLpBd.Da', -- bcrypt hash of AdminPass2025!
  'admin'
);

-- Sample persons
INSERT INTO persons (full_name, alias, fingerprint, role, signature) VALUES
('Kim Terje Rudschinat Grønli', 'KTRG', 'fingerprintdata', 'Grantor / Settlor', 'signaturedata'),
('Grønli Court of Records', null, null, 'Trustee', null),
('Kim-Terje Rudschinat Grønli', null, null, 'Authorized Signatory / Executor', 'signaturedata');

-- Sample roles
INSERT INTO roles (role_name, person_id, notes) VALUES
('Grantor / Settlor', 1, 'Living sovereign, personal authority with proof-of-life'),
('Trustee', 2, 'Notary private authority, trusted archival governance'),
('Authorized Signatory / Executor', 3, 'Notary & postmaster roles enable recognized signing authority');
