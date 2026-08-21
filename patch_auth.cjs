const fs = require('fs');
let content = fs.readFileSync('server/_core/auth.ts', 'utf8');
content = content.replace(
  'res.status(500).json({ error: "Login failed" });',
  'console.error(err); res.status(500).json({ error: "Login failed: " + (err.message || String(err)) });'
);
fs.writeFileSync('server/_core/auth.ts', content);
