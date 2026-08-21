const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const emojiMapCode = `
const emojiMap: Record<string, string> = {
  'Ice Hockey': '🏒',
  'Ball Hockey': '🏑',
  'Soccer': '⚽',
  'Lacrosse': '🥍',
  'Baseball': '⚾',
  'Softball': '🥎',
  'Gymnastics': '🤸',
  'Football': '🏈',
  'Basketball': '🏀',
  'Tennis': '🎾',
  'Golf': '⛳',
  'Swimming': '🏊',
  'Ringette': '💍',
  'Volleyball': '🏐',
  'Curling': '🥌',
  'Sailing': '⛵',
  'Wrestling': '🤼',
  'Martial Arts': '🥋',
  'Dance': '💃',
  'Cheerleading': '📣',
  'Figure Skating': '⛸️',
  'Power Skating': '⛸️',
  'Camps': '🏕️'
};`;

content = content.replace(/const SPORTS = \[[^\]]*\];/, match => match + '\n' + emojiMapCode);

const browseBySportHTML = `
      {/* Browse By Sport Section */}
      <section className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-800 mb-4">Browse by Sport</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Find exactly what you're looking for by filtering our directory by your favorite local sports and activities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SPORTS.map((sport) => {
              const emoji = emojiMap[sport] || "🏅";
              const count = programs.filter(p => p.isActive && p.sportName === sport).length;
              
              if (count === 0) return null;
              
              return (
                <button 
                  key={sport}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, sport: sport }));
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
            })}
          </div>
        </div>
      </section>

      {/* Footer */}`;

content = content.replace('{/* Footer */}', browseBySportHTML);
fs.writeFileSync('client/src/pages/Directory.tsx', content);
