const fs = require('fs');
let content = fs.readFileSync('server/_core/auth.ts', 'utf8');
content = content.replace(
  'sameSite: "none" as const,',
  'sameSite: (isSecure ? "none" : "lax") as const,'
);
fs.writeFileSync('server/_core/auth.ts', content);
