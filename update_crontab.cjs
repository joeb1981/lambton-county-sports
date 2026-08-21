const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Admin.tsx', 'utf8');

const newCronTab = `function CronTab() {
  const { data: cronStatus, isLoading, refetch } = trpc.cron.status.useQuery();
  const runCron = trpc.cron.run.useMutation({
    onSuccess: (data) => {
      toast.success(\`Scraping complete! \${data.programsChecked} programs checked, \${data.changesDetected} changes found.\`);
      refetch();
    },
    onError: (err) => {
      toast.error(\`Failed to run scraper: \${err.message}\`);
    }
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold">Web Scraper (CRON)</h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage the automated web scraper that visits all program URLs to find updated registration dates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-lg mb-1">Manual Execution</h3>
              <p className="text-xs text-muted-foreground">Trigger the web scraper to run immediately.</p>
            </div>
            <div className={\`p-2 rounded-full \${runCron.isPending ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}\`}>
              {runCron.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-6">
            Pressing this button will dispatch the bot to visit the registration websites of all active programs in the directory. It will use AI to read the text on their websites, look for new registration dates, and queue them in the <strong>Pending Changes</strong> tab for your review.
          </p>

          <Button 
            onClick={() => runCron.mutate()} 
            disabled={runCron.isPending}
            className="w-full bg-[#1B3A6B] hover:bg-blue-900 font-bold"
          >
            {runCron.isPending ? "Scraping Websites..." : "Run Web Scraper Now"}
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-4">Scheduler & Status</h3>
          
          {isLoading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading status...
            </div>
          ) : (
            <div className="space-y-5 flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Last Run</p>
                  <p className="text-slate-800 font-medium">{formatDate(cronStatus?.lastRunAt) || "Never"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Last Status</p>
                  <p className={cronStatus?.lastRunStatus === "success" ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                    {cronStatus?.lastRunStatus ? cronStatus.lastRunStatus.toUpperCase() : "TBD"}
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-[#1B3A6B]">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold text-sm uppercase tracking-wider">Next Scheduled Run</span>
                </div>
                <p className="font-medium text-slate-700">1st of the month at 9:00 AM</p>
                <p className="text-xs text-slate-500 mt-2">
                  The automated schedule is hardcoded into the Vercel serverless deployment config. If you need to change this cadence (e.g. to run weekly), please request a code update to <code className="bg-slate-200 px-1 py-0.5 rounded">vercel.json</code>.
                </p>
              </div>
            </div>
          )}
          
          <Button variant="outline" size="sm" className="mt-6 self-start font-medium" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(/function CronTab\(\) \{[\s\S]*?(?=\/\/ ── Main Admin Page ──)/, newCronTab + '\n\n');
fs.writeFileSync('client/src/pages/Admin.tsx', content);
