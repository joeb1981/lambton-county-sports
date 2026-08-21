const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');
content = content.replace('<main className="flex-1 py-12 px-4">', '<main id="directory-content" className="flex-1 py-12 px-4">');
fs.writeFileSync('client/src/pages/Directory.tsx', content);
