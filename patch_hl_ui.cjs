const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

// 1. Add HighLevelModal component before default export
const modalComponent = `
function HighLevelModal({ trigger, title, formId }: { trigger: React.ReactNode, title: string, formId: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in zoom-in-95 focus:outline-none">
          <div className="flex justify-between items-center p-4 border-b border-slate-100">
            <Dialog.Title className="text-xl font-bold font-display text-slate-800">{title}</Dialog.Title>
            <Dialog.Close className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full min-h-[500px] flex items-center justify-center bg-slate-50/50">
            {/* PLACEHOLDER FOR HIGHLEVEL IFRAME */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto opacity-20"></div>
              <p className="text-slate-500 font-medium">Waiting for HighLevel embed code...</p>
              <p className="text-xs text-slate-400">Form ID: {formId}</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

`;

if (!content.includes('function HighLevelModal')) {
    content = content.replace('export default function Directory() {', modalComponent + 'export default function Directory() {');
}


// 2. Replace Header "Admin Panel" and Logo with "Add Program" + "Admin Panel"
const oldHeaderRegex = /<img\s+src="\/lambton-county-sports-logo\.png"\s+alt="Lambton County Sports"\s+className="h-24 w-auto bg-white\/95 p-3\.5 rounded-xl shadow-sm"\s+\/>\s+\{user\?\.role === "admin" && \(\s+<button\s+onClick=\{\(\) => navigate\("\/admin"\)\}\s+className="text-white hover:text-green-300 font-bold text-sm uppercase tracking-wider transition-colors bg-black\/20 px-4 py-2 rounded-lg backdrop-blur-sm"\s+>\s+Admin Panel\s+<\/button>\s+\)\}/;

const newHeader = `<img
            src="/lambton-county-sports-logo.png"
            alt="Lambton County Sports"
            className="h-24 w-auto bg-white/95 p-3.5 rounded-xl shadow-sm"
          />
          <div className="flex items-center gap-3">
            <HighLevelModal 
              formId="submit_registration" 
              title="Submit a Registration" 
              trigger={
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-4 py-2.5 rounded-lg backdrop-blur-sm transition-all shadow-sm">
                  Add a Program
                </button>
              } 
            />
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="text-white hover:text-green-300 font-bold text-sm uppercase tracking-wider transition-colors bg-black/20 px-4 py-2.5 rounded-lg backdrop-blur-sm"
              >
                Admin Panel
              </button>
            )}
          </div>`;

if (oldHeaderRegex.test(content)) {
    content = content.replace(oldHeaderRegex, newHeader);
} else {
    console.log("Could not find old header pattern");
}


// 3. Add Subscribe CTA Section before {/* Footer */}
const ctaSection = `      {/* Subscribe CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: \`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")\`,
        }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Registration Deadline Again!</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get early alerts directly to your inbox when local sports programs open for registration. Select only the sports your kids actually play!
          </p>
          <HighLevelModal 
            formId="subscribe_alerts" 
            title="Subscribe for Registration Alerts" 
            trigger={
              <button className="bg-[#4A8C2A] text-white hover:bg-[#3A7A1A] hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 mx-auto">
                <span className="text-xl">📫</span> Subscribe For Updates
              </button>
            } 
          />
        </div>
      </section>

      {/* Footer */}`;

content = content.replace('{/* Footer */}', ctaSection);


// 4. Replace Enquire Sponsorship button in Footer
const oldFooterBtnRegex = /<a\s+href="https:\/\/link\.convertmorebusiness\.com\/widget\/form\/1CCxDZ3WadfM9IbjIZCk"\s+className="inline-block bg-\[#4A8C2A\] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-\[#3A7A1A\] transition-colors shadow-md"\s+target="_blank"\s+rel="noopener noreferrer"\s+>\s+Become a Sponsor\s+<\/a>/;

const newFooterBtn = `<HighLevelModal 
                formId="enquire_sponsorship" 
                title="Enquire About Sponsorship" 
                trigger={
                  <button className="inline-block bg-[#4A8C2A] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#3A7A1A] transition-colors shadow-md w-full sm:w-auto text-center">
                    Become a Sponsor
                  </button>
                }
              />`;

if (oldFooterBtnRegex.test(content)) {
    content = content.replace(oldFooterBtnRegex, newFooterBtn);
} else {
    console.log("Could not find old footer button pattern");
}


fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log("Successfully patched Directory.tsx");
