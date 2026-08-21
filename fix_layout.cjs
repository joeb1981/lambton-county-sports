const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Fix Logo: remove invert, add white pill background
content = content.replace(
  'className="h-16 w-auto drop-shadow-md brightness-0 invert opacity-95"',
  'className="h-16 w-auto bg-white/95 p-2.5 rounded-xl shadow-sm"'
);
content = content.replace(
  'className="text-white hover:text-[#4A8C2A] font-bold text-sm uppercase tracking-wider transition-colors bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"',
  'className="text-white hover:text-green-300 font-bold text-sm uppercase tracking-wider transition-colors bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"'
);

// Fix Layout: 2/3 Text, 1/3 Image (8 cols vs 4 cols)
content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">',
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[400px]">'
);

content = content.replace(
  '<div className="max-w-2xl">',
  '<div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center max-w-2xl py-8">'
);

content = content.replace(
  '<div className="hidden md:flex justify-end relative">',
  '<div className="hidden lg:flex lg:col-span-5 xl:col-span-4 relative">'
);

// Fix Image container height to match text
content = content.replace(
  '<div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">',
  '<div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500">'
);

// Fix Unsplash URLs (strip query params which might be causing issues, or provide fallback)
const oldImages = `const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=800&auto=format&fit=crop", // general sports
  "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=800&auto=format&fit=crop", // tennis
  "https://images.unsplash.com/photo-1515281239448-2abe329744c5?q=80&w=800&auto=format&fit=crop", // hockey
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop", // soccer
  "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop", // baseball
];`;

const newImages = `const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1515281239448-2abe329744c5?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=800&q=80", 
];`;
content = content.replace(oldImages, newImages);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Fixed Directory layout and images');
