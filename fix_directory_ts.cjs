const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Fix programs.filter
content = content.replace(
  'const count = programs.filter(p => p.isActive && p.sportName === sport).length;',
  'const count = programs?.filter(p => p.isActive && p.sportName === sport).length || 0;'
);

// Fix setFilters
content = content.replace(
  'setFilters(prev => ({ ...prev, sport: sport }));',
  'setSelectedSport(sport);'
);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
