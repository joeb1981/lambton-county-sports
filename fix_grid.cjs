const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// 1. Add `const hasSidebarAds = sidebarAds && sidebarAds.length > 0;`
content = content.replace(
  'const { data: sidebarAds } = trpc.ads.listActive.useQuery({ position: "sidebar_card" });',
  'const { data: sidebarAds } = trpc.ads.listActive.useQuery({ position: "sidebar_card" });\n  const hasSidebarAds = sidebarAds && sidebarAds.length > 0;'
);

// 2. Change `<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">`
content = content.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">',
  '<div className={`grid grid-cols-1 ${hasSidebarAds ? "lg:grid-cols-4" : "lg:grid-cols-1"} gap-8`}>'
);

// 3. Change `<div className="lg:col-span-3 lg:col-start-1">`
content = content.replace(
  '<div className="lg:col-span-3 lg:col-start-1">',
  '<div className={hasSidebarAds ? "lg:col-span-3 lg:col-start-1" : "lg:col-span-1"}>'
);

// 4. Change the Sidebar Area to only render if hasSidebarAds
content = content.replace(
  '<div className="lg:col-span-1">\n            <div className="sticky top-24 space-y-6">\n              {sidebarAds && sidebarAds.length > 0 && (',
  '{hasSidebarAds && (\n          <div className="lg:col-span-1">\n            <div className="sticky top-24 space-y-6">\n              {'
);

// And we need to close the conditional. The original sidebar code ends with:
//               )}
//             </div>
//           </div>
const originalSidebarEnd = `              )}
            </div>
          </div>

        </div>`;
const newSidebarEnd = `              }
            </div>
          </div>
          )}

        </div>`;
content = content.replace(originalSidebarEnd, newSidebarEnd);

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Fixed Directory.tsx sidebar grid logic');
