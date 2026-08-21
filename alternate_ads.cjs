const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldBlock = `                    {/* Inline Ad injected cleanly across both columns every 8 items */}
                    {inlineAds && inlineAds.length > 0 && (idx + 1) % 8 === 0 && (
                      <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center relative shadow-inner mt-2 mb-2">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                          Community Sponsor
                        </div>
                        <div className="flex justify-center flex-wrap gap-6 mt-2">
                          {inlineAds.map((ad: any) => (
                            <a
                              key={ad.id}
                              href={ad.destinationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group"
                            >
                              <img
                                src={ad.imageUrl}
                                alt={ad.title || "Advertisement"}
                                className="h-24 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 drop-shadow-sm"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}`;

const newBlock = `                    {/* Inline Ad injected cleanly across both columns every 8 items */}
                    {inlineAds && inlineAds.length > 0 && (idx + 1) % 8 === 0 && (() => {
                      const blockIndex = Math.floor((idx + 1) / 8) - 1;
                      const ad = inlineAds[blockIndex % inlineAds.length];
                      return (
                        <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center relative shadow-inner mt-2 mb-2">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                            Community Sponsor
                          </div>
                          <div className="flex justify-center mt-2">
                            <a
                              href={ad.destinationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group"
                            >
                              <img
                                src={ad.imageUrl}
                                alt={ad.title || "Advertisement"}
                                className="h-24 w-auto object-contain rounded-lg transition-transform group-hover:scale-105 drop-shadow-sm"
                              />
                            </a>
                          </div>
                        </div>
                      );
                    })()}`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync('client/src/pages/Directory.tsx', content);
  console.log('Successfully updated inline ads to alternate!');
} else {
  console.error('Could not find the old block to replace!');
}
