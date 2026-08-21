const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldHeroGrid = `<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[400px]">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center max-w-2xl py-8">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
                Find Every Kids Sport Signup in Lambton County
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 font-medium leading-relaxed max-w-lg">
                Registration dates, age groups, and sign-up links for all youth sports programs. All in one place.
              </p>
              <div>
                <button 
                  onClick={handleScrollToDirectory}
                  className="bg-[#4A8C2A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3A7A1A] transition-all transform hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide text-sm"
                >
                  Browse Programs
                </button>
              </div>
            </div>
            
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 relative">`;

const newHeroGrid = `<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[450px]">
            {/* Text Column - Increased width and font size */}
            <div className="lg:col-span-7 flex flex-col justify-center py-8 pr-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-[4.25rem] font-extrabold mb-6 leading-[1.1] tracking-tight text-white drop-shadow-md">
                Find Every Kids Sport Signup in Lambton County
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 font-medium leading-relaxed max-w-2xl">
                Registration dates, age groups, and sign-up links for all youth sports programs. All in one place.
              </p>
              <div>
                <button 
                  onClick={handleScrollToDirectory}
                  className="bg-[#4A8C2A] text-white px-10 py-5 rounded-xl font-extrabold hover:bg-[#3A7A1A] transition-all transform hover:-translate-y-1 hover:shadow-lg uppercase tracking-wider text-base"
                >
                  Browse Programs
                </button>
              </div>
            </div>
            
            {/* Image Column - Increased width from 4 to 5 columns on XL */}
            <div className="hidden lg:flex lg:col-span-5 relative">`;

if (content.includes(oldHeroGrid)) {
  content = content.replace(oldHeroGrid, newHeroGrid);
  fs.writeFileSync('client/src/pages/Directory.tsx', content);
  console.log('Successfully updated Hero section spacing and sizes');
} else {
  console.error('Could not find the old Hero grid block to replace!');
}
