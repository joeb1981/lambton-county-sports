const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Admin.tsx', 'utf8');
content = content.replace(
  '<TabsTrigger value="cron" className="gap-2">\n              <Clock className="h-4 w-4" />\n              Update Job\n            </TabsTrigger>',
  '<TabsTrigger value="cron" className="gap-2">\n              <RefreshCw className="h-4 w-4" />\n              Web Scraper\n            </TabsTrigger>'
);
fs.writeFileSync('client/src/pages/Admin.tsx', content);
