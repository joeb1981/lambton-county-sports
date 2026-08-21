const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const newCode = `            {SPORTS.map((sport) => {
              const emoji = emojiMap[sport] || "🏅";
              const count = allProgramsForStats?.filter(p => p.isActive && p.sportName === sport).length || 0;
              
              return (
                <button 
                  key={sport}
                  onClick={() => {
                    setSelectedSport(sport);
                    setSelectedStatus(""); // Clear the open/closed filter so they can see all programs for this sport!
                    window.scrollTo({ top: document.getElementById('directory-content')?.offsetTop || 500, behavior: 'smooth' });
                  }}
                  className="bg-slate-50 hover:bg-[#1B3A6B] hover:text-white group border border-slate-200 hover:border-[#1B3A6B] transition-all rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-sm text-slate-800 group-hover:text-white transition-colors">{sport}</span>
                    <span className="text-xs text-slate-500 group-hover:text-blue-200 mt-1">{count} Program{count !== 1 ? 's' : ''}</span>
                  </div>
                </button>
              );
            })}`;

content = content.replace(/\{SPORTS\.map\(\(sport\) => \{[\s\S]*?return \([\s\S]*?\);\n            \}\)\}/, newCode);
fs.writeFileSync('client/src/pages/Directory.tsx', content);
