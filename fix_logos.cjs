const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Fix Hero Logo
content = content.replace(
  'className="h-16 w-auto bg-white/95 p-2.5 rounded-xl shadow-sm"',
  'className="h-24 w-auto bg-white/95 p-3.5 rounded-xl shadow-sm"'
);

// Fix Footer Logo
content = content.replace(
  'className="h-16 w-auto mb-6 brightness-0 invert opacity-90"',
  'className="h-24 w-auto mb-6 bg-white/95 p-3.5 rounded-xl shadow-sm"'
);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Fixed and enlarged logos');
