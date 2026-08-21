const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldCtaRegex = /\{\/\* Subscribe CTA Section \*\/\}\s*<section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-4 relative overflow-hidden">[\s\S]*?<\/section>/;

const newCta = `{/* Subscribe CTA Section */}
      <section className="py-16 px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative glowing background orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Stay in the loop
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
                Never miss a registration deadline again.
              </h2>
              
              <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
                Get early alerts directly to your inbox when local sports programs open for registration. Select only the sports your kids actually play!
              </p>
              
              <HighLevelModal 
                formId="subscribe_alerts" 
                title="Subscribe for Registration Alerts" 
                trigger={
                  <button className="bg-white text-slate-900 hover:bg-slate-50 hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto mx-auto lg:mx-0 group">
                    Subscribe For Updates
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors group-hover:translate-x-1" />
                  </button>
                } 
              />
            </div>
            
            {/* Visual Decorative Element */}
            <div className="hidden lg:flex relative w-72 h-72 items-center justify-center perspective-1000">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-[2rem] rotate-6 opacity-20 blur-xl animate-pulse"></div>
               <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl flex flex-col gap-4 w-full transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-inner">
                      📫
                    </div>
                    <div>
                      <div className="h-2.5 w-24 bg-white/30 rounded-full mb-1.5"></div>
                      <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-white/10 rounded-full"></div>
                  <div className="h-2.5 w-5/6 bg-white/10 rounded-full"></div>
                  <div className="h-2.5 w-4/6 bg-white/10 rounded-full"></div>
                  <div className="mt-6 flex gap-2">
                    <div className="h-8 w-24 bg-emerald-500/80 rounded-lg shadow-sm"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>`;

if (oldCtaRegex.test(content)) {
    content = content.replace(oldCtaRegex, newCta);
    fs.writeFileSync('client/src/pages/Directory.tsx', content);
    console.log("Successfully updated CTA style");
} else {
    console.log("Could not find old CTA pattern");
}
