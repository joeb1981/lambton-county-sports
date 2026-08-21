const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// For the top banner:
content = content.replace(
  'className="w-full h-auto max-h-32 object-contain rounded-lg shadow-sm transition-transform group-hover:scale-[1.01]"',
  'className="w-full h-auto object-contain transition-transform group-hover:scale-[1.01]"'
);

// We should also remove the background white from the container so if the image has rounded corners it looks seamless against the background
content = content.replace(
  '<div className="bg-white border-b border-slate-200 shadow-sm relative z-20">',
  '<div className="bg-slate-50 border-b border-slate-200 shadow-sm relative z-20">'
);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Fixed banner styling for the new wide image');
