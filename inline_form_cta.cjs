const fs = require('fs');
let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldCtaRegex = /\{\/\* Subscribe CTA Section \*\/\}\s*<section className="bg-slate-900 py-20 px-6 lg:px-8 relative overflow-hidden border-t border-slate-800">[\s\S]*?<\/section>/;

const newCta = `{/* Subscribe CTA Section */}
      <section className="bg-slate-900 py-20 px-6 lg:px-8 relative overflow-hidden border-t border-slate-800">
        {/* Decorative glowing background orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: \`radial-gradient(circle, #fff 1px, transparent 1px)\`, backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:max-w-2xl text-center lg:text-left flex-1">
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
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Get early alerts directly to your inbox when local sports programs open for registration. Select only the sports your kids actually play!
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 text-blue-200 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                100% Free
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                No Spam
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                Cancel Anytime
              </div>
            </div>
          </div>
          
          {/* Inline Form Mockup / Container */}
          <div className="w-full max-w-md lg:w-[420px] shrink-0 relative z-20">
             {/* This outer div will eventually just hold the GHL iframe code */}
             <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full border-t-4 border-[#4A8C2A]">
                <h3 className="font-bold text-xl text-slate-800 mb-2">Get Registration Alerts</h3>
                <p className="text-slate-500 text-sm mb-6">Select your sports and we'll handle the rest.</p>
                
                {/* Mockup Form Fields (To be replaced by GHL iframe) */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">First Name</label>
                    <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-lg"></div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Email Address</label>
                    <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-lg"></div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Sports (Select multiple)</label>
                    <div className="h-24 w-full bg-slate-50 border border-slate-200 rounded-lg"></div>
                  </div>
                  <button className="w-full bg-[#4A8C2A] text-white py-3.5 rounded-xl font-bold text-lg shadow-md opacity-60 cursor-not-allowed mt-2">
                    Subscribe
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Waiting for HighLevel Embed Code
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>`;

if (oldCtaRegex.test(content)) {
    content = content.replace(oldCtaRegex, newCta);
    fs.writeFileSync('client/src/pages/Directory.tsx', content);
    console.log("Successfully updated CTA to inline form mockup");
} else {
    console.log("Could not find old CTA pattern. Exiting.");
}
