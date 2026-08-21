const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// 1. Add useEffect to imports
content = content.replace('useMemo, useState', 'useMemo, useState, useEffect');

// 2. Add HERO_IMAGES array
const imagesArray = `
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=800&auto=format&fit=crop", // general sports
  "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=800&auto=format&fit=crop", // tennis
  "https://images.unsplash.com/photo-1515281239448-2abe329744c5?q=80&w=800&auto=format&fit=crop", // hockey
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop", // soccer
  "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=800&auto=format&fit=crop", // baseball
];
`;
content = content.replace('const TOP_SPORTS =', imagesArray + 'const TOP_SPORTS =');

// 3. Add state and effect
const stateToAdd = `  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);`;
content = content.replace('const [selectedAge, setSelectedAge] = useState("");', 'const [selectedAge, setSelectedAge] = useState("");\n' + stateToAdd);

// 4. Remove navbar, update hero container, insert logo into hero
const oldNav = `<nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/lambton-county-sports-logo.png"
              alt="Lambton County Sports"
              className="h-14 w-auto drop-shadow-sm"
            />
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="text-slate-500 hover:text-[#4A8C2A] font-semibold text-sm uppercase tracking-wider transition-colors"
            >
              Admin Panel
            </button>
          )}
        </div>
      </nav>`;

const newHeader = `{/* Logo integrated into Hero */}
        <div className="absolute top-0 left-0 right-0 p-6 z-30 flex justify-between items-center max-w-5xl mx-auto w-full">
          <img
            src="/lambton-county-sports-logo.png"
            alt="Lambton County Sports"
            className="h-16 w-auto drop-shadow-md brightness-0 invert opacity-95"
          />
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="text-white hover:text-[#4A8C2A] font-bold text-sm uppercase tracking-wider transition-colors bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Admin Panel
            </button>
          )}
        </div>`;

content = content.replace(oldNav, '');

// Replace hero section container width and padding
content = content.replace('<section className="bg-gradient-to-br from-[#1B3A6B] to-[#12284D] text-white py-16 md:py-24 relative overflow-hidden">', '<section className="bg-gradient-to-br from-[#1B3A6B] to-[#12284D] text-white pt-28 pb-16 md:pb-24 relative overflow-hidden">\n' + newHeader);

content = content.replace('<div className="container relative z-10">', '<div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">');

// 5. Update rotating images logic
const oldImg = `<img 
                  src="https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1200&auto=format&fit=crop" 
                  alt="Kids playing sports" 
                  className="w-full h-full object-cover"
                />`;
const newImg = `{HERO_IMAGES.map((src, idx) => (
                  <img 
                    key={src}
                    src={src} 
                    alt="Kids playing sports" 
                    className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 \${idx === currentImageIdx ? 'opacity-100' : 'opacity-0'}\`}
                  />
                ))}`;
content = content.replace(oldImg, newImg);

// 6. Replace all other "container" classes with the narrower width
content = content.replace(/className="container /g, 'className="max-w-5xl mx-auto px-6 lg:px-8 ');

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Updated Directory.tsx');
