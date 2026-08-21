const fs = require('fs');
let content = fs.readFileSync('server/_core/auth.ts', 'utf8');
content = content.replace('sameSite: isSecure ? "none" : "lax",', 'sameSite: (isSecure ? "none" : "lax") as "none" | "lax",');
fs.writeFileSync('server/_core/auth.ts', content);
