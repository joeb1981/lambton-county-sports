const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldTextRegex = /<p className="text-center text-\[10px\] text-slate-400 mt-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2">\s*<span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"><\/span>\s*Waiting for HighLevel Embed Code\s*<\/p>/;

if (oldTextRegex.test(content)) {
    content = content.replace(oldTextRegex, "");
    fs.writeFileSync('client/src/pages/Directory.tsx', content);
    console.log("Successfully removed placeholder text");
} else {
    console.log("Could not find placeholder text");
}
