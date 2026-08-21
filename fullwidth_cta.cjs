const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// Match the current CTA section (starts with {/* Subscribe CTA Section */} and ends with </section>)
const oldCtaRegex = /\{\/\* Subscribe CTA Section \*\/\}\s*<section className="py-16 px-6 lg:px-8 max-w-6xl mx-auto w-full">[\s\S]*?<\/section>/;

const newCta = `{/* Subscribe CTA Section */}
      <section className="bg-slate-900 py-20 px-6 lg:px-8 relative overflow-hidden border-t border-slate-800">
        {/* Decorative glowing background orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: \`radial-gradient(circle, #fff 1px, transparent 1px)\`, backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Registration Alerts
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
              Never miss a deadline again.
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Get early alerts directly to your inbox when local sports programs open for registration. Select only the sports your kids actually play!
            </p>
            
            <HighLevelModal 
              formId="subscribe_alerts" 
              title="Subscribe for Registration Alerts" 
              trigger={
                <button className="bg-[#4A8C2A] text-white hover:bg-[#3A7A1A] hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto mx-auto lg:mx-0 group">
                  <span className="text-xl">📫</span> Subscribe For Updates
                  <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors group-hover:translate-x-1" />
                </button>
              } 
            />
          </div>
          
          {/* Visual Notification Mockup Element */}
          <div className="hidden lg:flex relative w-96 h-80 items-center justify-center perspective-1000">
             {/* Main Email/Notification Card */}
             <div className="absolute z-20 bg-white p-6 rounded-2xl shadow-2xl w-80 transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      ⚽
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Lambton Sports</h4>
                      <p className="text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Registration is Open!</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Fall Soccer registration is officially open. Secure your spot before it fills up.
                </p>
                <div className="w-full py-2.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg text-center transition-colors hover:bg-blue-100 cursor-pointer">
                  Register Now
                </div>
             </div>
             
             {/* Background Card 1 */}
             <div className="absolute z-10 bg-white/90 p-6 rounded-2xl shadow-xl w-80 transform -rotate-6 translate-x-4 -translate-y-6 opacity-60">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                      🏒
                    </div>
                    <div>
                      <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="h-4 w-3/4 bg-slate-200 rounded mb-3"></div>
                <div className="h-3 w-full bg-slate-100 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
             </div>
          </div>
        </div>
      </section>`;

if (oldCtaRegex.test(content)) {
    content = content.replace(oldCtaRegex, newCta);
    fs.writeFileSync('client/src/pages/Directory.tsx', content);
    console.log("Successfully updated CTA to full width");
} else {
    console.log("Could not find old CTA pattern. Exiting.");
}
