const fs = require('fs');

let content = fs.readFileSync('server/_core/index.ts', 'utf8');

// Change app.post to app.all to handle Vercel's GET requests for cron jobs
content = content.replace(
  'app.post("/api/cron/monthly-url-check", monthlyUrlCheckHandler);',
  'app.all("/api/cron/monthly-url-check", monthlyUrlCheckHandler);'
);

fs.writeFileSync('server/_core/index.ts', content);
console.log('Fixed cron handler method');
