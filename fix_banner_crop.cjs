const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Update Top Banner Ad to use object-contain
content = content.replace(
  'className="w-full h-auto max-h-32 object-cover rounded-lg shadow-sm border border-slate-100 transition-transform group-hover:scale-[1.01]"',
  'className="w-full h-auto max-h-32 object-contain rounded-lg shadow-sm transition-transform group-hover:scale-[1.01]"'
);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Updated banner ad to object-contain');
