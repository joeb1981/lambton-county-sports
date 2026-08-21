const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const newCode = `            {SPORTS.map((sport) => {
              const emoji = emojiMap[sport] || "🏅";
              const sportPrograms = allProgramsForStats?.filter(p => p.isActive && p.sportName === sport) || [];
              
              const now = new Date();
              let openCount = 0;
              let upcomingCount = 0;
              let closedCount = 0;
              
              sportPrograms.forEach(p => {
                const openDate = p.registrationOpenDate ? new Date(p.registrationOpenDate) : null;
                const closeDate = p.registrationCloseDate ? new Date(p.registrationCloseDate) : null;
                
                if (openDate && closeDate && openDate <= now && now <= closeDate) {
                  openCount++;
                } else if (openDate && openDate > now) {
                  upcomingCount++;
                } else {
                  closedCount++;
                }
              });

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
                    <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium text-slate-500 group-hover:text-blue-200">
                      <span className={openCount > 0 ? "text-emerald-600 group-hover:text-emerald-300 font-bold" : ""}>{openCount} Open</span>
                      <span className="text-slate-300 group-hover:text-blue-400">|</span>
                      <span className={upcomingCount > 0 ? "text-amber-600 group-hover:text-amber-300 font-bold" : ""}>{upcomingCount} Upcoming</span>
                      <span className="text-slate-300 group-hover:text-blue-400">|</span>
                      <span>{closedCount} Closed</span>
                    </div>
                  </div>
                </button>
              );
            })}`;

content = content.replace(/\{SPORTS\.map\(\(sport\) => \{[\s\S]*?return \([\s\S]*?\);\n            \}\)\}/, newCode);
fs.writeFileSync('client/src/pages/Directory.tsx', content);
