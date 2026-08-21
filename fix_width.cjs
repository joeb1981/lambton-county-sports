const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Replace all instances of max-w-5xl with max-w-6xl so everything aligns
content = content.replace(/max-w-5xl/g, 'max-w-6xl');

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Updated max-w-5xl to max-w-6xl');
