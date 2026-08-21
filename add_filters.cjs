const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const dropdownsCode = `
              {/* Dropdown Grid (Added to Main Body as requested) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-100">
                <Select value={selectedSport || "all"} onValueChange={(v) => setSelectedSport(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-slate-50 border-slate-200 rounded-lg">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-semibold text-slate-500">All Sports</SelectItem>
                    {SPORTS.map((sport) => (
                      <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTown || "all"} onValueChange={(v) => setSelectedTown(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-slate-50 border-slate-200 rounded-lg">
                    <SelectValue placeholder="All Towns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-semibold text-slate-500">All Towns</SelectItem>
                    {TOWNS.map((town) => (
                      <SelectItem key={town} value={town}>{town}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus || "all"} onValueChange={(v) => setSelectedStatus(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-slate-50 border-slate-200 rounded-lg">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-semibold text-slate-500">All Statuses</SelectItem>
                    <SelectItem value="open">🟢 Open</SelectItem>
                    <SelectItem value="upcoming">🟡 Upcoming</SelectItem>
                    <SelectItem value="closed">⚪ Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedAge || "all"} onValueChange={(v) => setSelectedAge(v === "all" ? "" : v)}>
                  <SelectTrigger className="bg-slate-50 border-slate-200 rounded-lg">
                    <SelectValue placeholder="All Ages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-semibold text-slate-500">All Ages</SelectItem>
                    {AGE_RANGES.map((range) => (
                      <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>`;

const searchToReplace = `              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="text-sm font-semibold text-slate-500 py-1.5 pr-2">Popular:</span>
                {TOP_SPORTS.map(sport => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(selectedSport === sport ? "" : sport)}
                    className={\`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border \${
                      selectedSport === sport 
                      ? "bg-[#1B3A6B] text-white border-[#1B3A6B] shadow-sm" 
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#1B3A6B] hover:text-[#1B3A6B]"
                    }\`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>`;

content = content.replace(searchToReplace, searchToReplace.replace('</div>\n            </div>', `</div>\n${dropdownsCode}\n            </div>`));

fs.writeFileSync('client/src/pages/Directory.tsx', content);
console.log('Duplicated filters to main body successfully.');
