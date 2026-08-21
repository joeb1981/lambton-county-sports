const fs = require('fs');

const directoryCode = `import React, { useMemo, useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, MapPin, Calendar, Users, Search, X, Info } from "lucide-react";
import { useLocation } from "wouter";

const SPORTS = [
  "Ice Hockey",
  "Ball Hockey",
  "Soccer",
  "Lacrosse",
  "Baseball",
  "Softball",
  "Gymnastics",
  "Football",
  "Basketball",
  "Tennis",
  "Golf",
  "Swimming",
  "Ringette",
  "Volleyball",
  "Curling",
  "Sailing",
  "Wrestling",
  "Martial Arts",
  "Dance",
  "Cheerleading",
  "Figure Skating",
  "Power Skating",
  "Camps",
];

const HERO_IMAGES = [
  "/hero-basketball.png",
  "/hero-soccer.jpg",
  "/hero-hockey.jpg",
  "/hero-baseball.jpg",
  "/hero-tennis.jpg",
];

const TOP_SPORTS = ["Ice Hockey", "Soccer", "Baseball", "Basketball", "Figure Skating", "Gymnastics"];

const TOWNS = [
  "Sarnia",
  "Wyoming",
  "Petrolia",
  "Forest",
  "Grand Bend",
  "Camlachie",
  "Port Lambton",
  "Point Edward",
  "Corunna",
  "Warwick",
  "Lambton Shores",
];

const AGE_RANGES = [
  { label: "Ages 3-5 (Pre-K to SK)", min: 3, max: 5 },
  { label: "Ages 6-8 (Grades 1-3)", min: 6, max: 8 },
  { label: "Ages 9-11 (Grades 4-6)", min: 9, max: 11 },
  { label: "Ages 12-14 (Grades 7-8)", min: 12, max: 14 },
  { label: "Ages 15-17 (Grades 9-11)", min: 15, max: 17 },
  { label: "Ages 18+ (Senior)", min: 18, max: 99 },
];

export default function Directory() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("open");
  const [selectedAge, setSelectedAge] = useState("");
  
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const ageRange = useMemo(() => {
    if (!selectedAge) return undefined;
    const range = AGE_RANGES.find((r) => r.label === selectedAge);
    return range ? { min: range.min, max: range.max } : undefined;
  }, [selectedAge]);

  const { data: programs, isLoading } = trpc.programs.list.useQuery({
    search: search || undefined,
    sport: selectedSport || undefined,
    townArea: selectedTown || undefined,
    status: (selectedStatus as any) || undefined,
    ageMin: ageRange?.min,
    ageMax: ageRange?.max,
  });

  const { data: topAds } = trpc.ads.listActive.useQuery({ position: "banner_top" });
  const { data: bottomAds } = trpc.ads.listActive.useQuery({ position: "banner_bottom" });
  const { data: sidebarAds } = trpc.ads.listActive.useQuery({ position: "sidebar_card" });
  const { data: inlineAds } = trpc.ads.listActive.useQuery({ position: "inline_card" });
  
  // We force the sidebar to show even if there are no ads, so we can display a placeholder
  const hasSidebarAds = true;

  const activeFilters = [
    selectedSport && { type: "sport", label: selectedSport, value: selectedSport },
    selectedTown && { type: "town", label: selectedTown, value: selectedTown },
    selectedStatus && { type: "status", label: selectedStatus, value: selectedStatus },
    selectedAge && { type: "age", label: selectedAge, value: selectedAge },
  ].filter(Boolean) as Array<{ type: string; label: string; value: string }>;

  const clearFilter = (type: string) => {
    if (type === "sport") setSelectedSport("");
    if (type === "town") setSelectedTown("");
    if (type === "status") setSelectedStatus("");
    if (type === "age") setSelectedAge("");
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedSport("");
    setSelectedTown("");
    setSelectedStatus("");
    setSelectedAge("");
  };

  const handleScrollToDirectory = () => {
    const el = document.getElementById("directory-start");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B3A6B] to-[#12284D] text-white pt-28 pb-16 md:pb-24 relative overflow-hidden">
        {/* Logo integrated into Hero */}
        <div className="absolute top-0 left-0 right-0 p-6 z-30 flex justify-between items-center max-w-5xl mx-auto w-full">
          <img
            src="/lambton-county-sports-logo.png"
            alt="Lambton County Sports"
            className="h-16 w-auto bg-white/95 p-2.5 rounded-xl shadow-sm"
          />
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="text-white hover:text-green-300 font-bold text-sm uppercase tracking-wider transition-colors bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              Admin Panel
            </button>
          )}
        </div>
        {/* Subtle dot texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: \`radial-gradient(circle, #fff 1.5px, transparent 1.5px)\`,
          backgroundSize: '24px 24px',
        }}></div>
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[400px]">
            {/* Left: Content */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center max-w-2xl py-8">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
                Find Every Kids Sport Signup in Lambton County
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 font-medium leading-relaxed max-w-lg">
                Registration dates, age groups, and sign-up links for all youth sports programs. All in one place.
              </p>
              <div>
                <button 
                  onClick={handleScrollToDirectory}
                  className="bg-[#4A8C2A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3A7A1A] transition-all transform hover:-translate-y-1 hover:shadow-lg uppercase tracking-wide text-sm"
                >
                  Browse Programs
                </button>
              </div>
            </div>
            
            {/* Right: Modern Visual/Placeholder */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 relative">
              <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-slate-100">
                {HERO_IMAGES.map((src, idx) => (
                  <img 
                    key={src}
                    src={src} 
                    alt="Kids playing sports" 
                    className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 \${idx === currentImageIdx ? "opacity-100" : "opacity-0"}\`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur text-[#1B3A6B] px-4 py-3 rounded-xl shadow-lg inline-flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A8C2A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4A8C2A]"></span>
                    </span>
                    <span className="font-bold text-sm">60+ Local Programs Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      {topAds && topAds.length > 0 && (
        <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex justify-center">
            {topAds.map((ad: any) => (
              <a
                key={ad.id}
                href={ad.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative"
              >
                <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">Sponsor</div>
                <img
                  src={ad.imageUrl}
                  alt={ad.title || "Advertisement"}
                  className="w-full h-auto max-h-32 object-cover rounded-lg shadow-sm border border-slate-100 transition-transform group-hover:scale-[1.01]"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div id="directory-start" className="max-w-6xl mx-auto px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Main Directory Area (Left Side) */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-[#1B3A6B] tracking-tight">Browse Directory</h2>
              <span className="text-slate-500 font-medium bg-white px-3 py-1 rounded-full shadow-sm text-sm border border-slate-200">
                {programs?.length || 0} Programs Found
              </span>
            </div>
            
            {/* Filtering Engine (At the top of the main body) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
              <div className="space-y-5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search for a sport, club, or town..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-50 border-0 ring-1 ring-inset ring-slate-200 pl-12 pr-4 py-6 text-lg text-slate-800 placeholder-slate-400 rounded-xl focus-visible:ring-2 focus-visible:ring-[#4A8C2A] shadow-inner"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 pt-1">
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

                {/* Dropdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                  <Select value={selectedSport || "all"} onValueChange={(v) => setSelectedSport(v === "all" ? "" : v)}>
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg">
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
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg">
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
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="font-semibold text-slate-500">All Statuses</SelectItem>
                      <SelectItem value="open">🟢 Registration Open</SelectItem>
                      <SelectItem value="upcoming">🟡 Registration Upcoming</SelectItem>
                      <SelectItem value="closed">⚪ Registration Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedAge || "all"} onValueChange={(v) => setSelectedAge(v === "all" ? "" : v)}>
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="font-semibold text-slate-500">All Ages</SelectItem>
                      {AGE_RANGES.map((range) => (
                        <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Filters Bar */}
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <span className="text-sm font-semibold text-slate-500 mr-1">Active Filters:</span>
                {activeFilters.map((filter) => (
                  <button
                    key={\`\${filter.type}-\${filter.value}\`}
                    onClick={() => clearFilter(filter.type)}
                    className="bg-white text-[#1B3A6B] px-3 py-1.5 text-sm font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {filter.label}
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-slate-500 hover:text-slate-800 underline text-sm font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Programs 2-Column Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <Skeleton className="h-6 w-1/2 mb-4 rounded-lg" />
                    <Skeleton className="h-4 w-1/3 mb-6 rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full rounded-lg" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : programs && programs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program, idx) => (
                  <React.Fragment key={program.id}>
                    <ProgramCard program={program} />

                    {/* Inline Ad injected cleanly across both columns every 8 items */}
                    {inlineAds && inlineAds.length > 0 && (idx + 1) % 8 === 0 && (
                      <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center relative shadow-inner">
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
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No programs found</h3>
                <p className="text-slate-500 mb-6">We couldn't find any programs matching your current filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-slate-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar Area (Right Side) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {sidebarAds && sidebarAds.length > 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Proudly Supported By</span>
                  </div>
                  <div className="p-4 space-y-6">
                    {sidebarAds.map((ad: any) => (
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
                          className="w-full h-auto rounded-lg shadow-sm border border-slate-100 transition-all group-hover:shadow-md group-hover:-translate-y-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                /* Placeholder Ad box so the user can visualize the sidebar */
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm p-6 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-slate-400 font-bold text-lg">$</span>
                  </div>
                  <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-2">Advertise Here</h4>
                  <p className="text-xs text-slate-500 mb-4">Support local youth sports and reach thousands of parents in Lambton County.</p>
                  <a href="#" className="inline-block bg-[#1B3A6B] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">Learn More</a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Banner Ad */}
      {bottomAds && bottomAds.length > 0 && (
        <div className="bg-white border-t border-slate-200 shadow-sm mt-12 py-6">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 flex justify-center relative">
             <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                Community Sponsor
             </div>
            {bottomAds.map((ad: any) => (
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
                  className="w-full h-auto max-h-32 object-cover rounded-lg shadow-sm transition-transform group-hover:scale-[1.01]"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#12284D] text-white border-t-4 border-[#4A8C2A] mt-auto">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <img
                src="/lambton-county-sports-logo.png"
                alt="Lambton County Sports"
                className="h-16 w-auto mb-6 brightness-0 invert opacity-90"
              />
              <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
                The most complete directory of youth sports programs in Lambton County. Giving local kids more opportunities to play.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li>
                  <button onClick={handleScrollToDirectory} className="hover:text-white hover:underline transition-all flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Browse Directory
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:underline transition-all flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> About Us
                  </a>
                </li>
                <li>
                  <a href="https://link.convertmorebusiness.com/widget/form/1CCxDZ3WadfM9IbjIZCk" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-all flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-6 tracking-wide">For Local Businesses</h4>
              <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                Connect with thousands of local parents by advertising your business directly in our directory.
              </p>
              <a
                href="https://link.convertmorebusiness.com/widget/form/1CCxDZ3WadfM9IbjIZCk"
                className="inline-block bg-[#4A8C2A] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#3A7A1A] transition-colors shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Become a Sponsor
              </a>
            </div>
          </div>
          <div className="border-t border-blue-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-300 text-sm">
            <p>
              © {new Date().getFullYear()} Lambton County Sports Directory. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Compact 2-column grid ProgramCard
function ProgramCard({ program }: { program: any }) {
  const getStatus = (p: any) => {
    const now = new Date();
    const open = p.registrationOpenDate ? new Date(p.registrationOpenDate) : null;
    const close = p.registrationCloseDate ? new Date(p.registrationCloseDate) : null;
    if (open && close && open <= now && now <= close) return "open";
    if (open && open > now) return "upcoming";
    return "closed";
  };

  const status = getStatus(program);

  const StatusBadge = () => {
    if (status === "open") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
          Open
        </span>
      );
    }
    if (status === "upcoming") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wide shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        Closed
      </span>
    );
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "TBD";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 flex flex-col group relative h-full">
      
      {/* Visual Accent Line */}
      <div className={\`h-1.5 w-full rounded-t-2xl \${
        status === 'open' ? 'bg-green-500' : 
        status === 'upcoming' ? 'bg-amber-400' : 'bg-slate-300'
      }\`}></div>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#1B3A6B] transition-colors leading-tight">
              {program.sportName}
            </h3>
            <StatusBadge />
          </div>
          <p className="text-sm font-medium text-slate-600 line-clamp-1">{program.organization}</p>
        </div>

        {/* 2-Column Data Grid (Compact) */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-5 py-4 border-y border-slate-100 flex-1">
          
          <div className="flex gap-2.5 items-start">
            <div className="mt-0.5 text-blue-500 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">{program.townArea}</p>
            </div>
          </div>
          
          <div className="flex gap-2.5 items-start">
            <div className="mt-0.5 text-green-500 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Reg. Window</p>
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {formatDate(program.registrationOpenDate)}<br/>
                <span className="text-slate-400 font-normal">to</span> {formatDate(program.registrationCloseDate)}
              </p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start">
            <div className="mt-0.5 text-purple-500 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Season</p>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">{formatDate(program.programStartDate)}</p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start">
            <div className="mt-0.5 text-amber-500 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Ages</p>
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">{program.ageGroups}</p>
            </div>
          </div>
          
        </div>

        {/* Footer Area */}
        <div className="mt-auto flex flex-col gap-3">
          {program.notes && (
            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
              <span className="line-clamp-2" title={program.notes}>{program.notes}</span>
            </div>
          )}
          
          {program.registrationUrl && (
            <a
              href={program.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={\`flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm \${
                status === 'open' 
                  ? 'bg-[#4A8C2A] text-white hover:bg-[#3A7A1A] hover:shadow-md' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }\`}
            >
              {status === 'open' ? 'Register Now' : 'View Website'}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('client/src/pages/Directory.tsx', directoryCode);
console.log('Successfully refactored Directory to 2-column layout with right sidebar');
