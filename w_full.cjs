const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// The dropdowns in the main body were added with this exact class string:
content = content.replaceAll(
  'className="bg-slate-50 border-slate-200 rounded-lg"',
  'className="w-full bg-slate-50 border-slate-200 rounded-lg"'
);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Added w-full to SelectTriggers');
