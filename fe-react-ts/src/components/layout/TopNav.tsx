import React from "react";
import { Bookmark, History, Home, LayoutDashboard, Menu, PlusCircle, Search, Settings, User } from "lucide-react";
import { ViewTab } from "../../types";

interface TopNavProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  setSelectedCategory: (category: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchVal?: string;
  setSearchVal?: (val: string) => void;
}

const navItems: Array<{ label: string; tab: ViewTab; resetCategory?: boolean; icon: React.ReactNode }> = [
  { label: "Home", tab: "Home", resetCategory: true, icon: <Home className="w-4 h-4" /> },
  { label: "History", tab: "History", icon: <History className="w-4 h-4" /> },
  { label: "Saved", tab: "Saved", icon: <Bookmark className="w-4 h-4" /> },
  { label: "Dashboard", tab: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Write", tab: "Create", icon: <PlusCircle className="w-4 h-4" /> },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  setSelectedCategory,
  sidebarOpen,
  setSidebarOpen,
  searchVal,
  setSearchVal
}) => {
  const handleNavClick = (tab: ViewTab, resetCategory?: boolean) => {
    setActiveTab(tab);
    if (resetCategory) setSelectedCategory(null);
  };

  const renderDesktopNavButton = (item: typeof navItems[number]) => (
    <button
      key={item.tab}
      onClick={() => handleNavClick(item.tab, item.resetCategory)}
      className={`shrink-0 px-3 py-1.5 rounded-md font-medium text-sm transition-all ${activeTab === item.tab
        ? "text-blue-600 bg-blue-50 font-bold"
        : "text-slate-600 hover:text-blue-600"
        }`}
    >
      <span className="flex items-center gap-1.5">
        {item.tab === "Create" && item.icon}
        {item.label}
      </span>
    </button>
  );

  const renderMobileNavButton = (item: typeof navItems[number]) => (
    <button
      key={item.tab}
      onClick={() => handleNavClick(item.tab, item.resetCategory)}
      className={`h-10 flex-1 min-w-0 rounded-lg flex items-center justify-center transition-all ${activeTab === item.tab
        ? "text-blue-600 bg-blue-50"
        : "text-slate-500 hover:text-blue-600 hover:bg-slate-100"
        }`}
      title={item.label}
      aria-label={item.label}
    >
      {item.icon}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 z-50">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
            title="Toggle Sidebar (Ctrl+B)"
            id="sidebar-toggle-btn"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => handleNavClick("Home", true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="font-mono text-xl font-black tracking-tighter text-blue-600">
              IDK
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2 ml-4 lg:ml-6">
            {navItems.map(renderDesktopNavButton)}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg gap-2.5 min-w-[320px] transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <Search className="w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search technical docs..."
              value={searchVal || ""}
              onChange={(e) => setSearchVal?.(e.target.value)}
              className="bg-transparent border-none outline-none font-mono text-xs w-full text-slate-800 placeholder:text-slate-400 focus:ring-0"
            />
            <span className="ml-auto text-slate-400 text-[10px] bg-slate-200/60 uppercase border border-slate-200 font-mono px-1.5 py-0.5 rounded leading-none">
              Ctrl K
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveTab("Dashboard")}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-transform active:scale-95"
              title="Dashboard"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab("History")}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-transform active:scale-95"
              title="Admin user Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <nav className="md:hidden grid grid-cols-5 gap-1 px-3 pb-3">
        {navItems.map(renderMobileNavButton)}
      </nav>
    </header>
  );
};
