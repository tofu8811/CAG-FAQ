
import React from "react";
import { ViewTab, Category } from "../../types";

interface SidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setActiveTab: (tab: ViewTab) => void;
  sidebarOpen: boolean;
  categories: Category[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  setActiveTab,
  sidebarOpen,
  categories
}) => {
  return (
    <aside
      id="sidebar"
      className={`fixed left-0 top-[112px] md:top-16 h-[calc(100vh-112px)] md:h-[calc(100vh-64px)] bg-slate-100/80 backdrop-blur-md border-r border-slate-200 z-40 flex flex-col py-6 select-none transition-all duration-300 ${sidebarOpen ? "w-[260px] translate-x-0" : "w-[260px] -translate-x-[260px]"
        }`}
    >
      <div className="px-6 mb-6">
        <h3 className="font-mono text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-1">CATEGORIES</h3>
        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Filter by domain</p>
      </div>

      <nav className="flex flex-col space-y-0.5 flex-1 overflow-y-auto px-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(isActive ? null : cat.id);
                setActiveTab("Home"); // direct to home for category lists
              }}
              className={`group flex items-center gap-3 w-full p-2.5 px-4 rounded-lg font-mono text-[13px] font-medium transition-all text-left ${isActive
                ? "bg-blue-600 text-white font-semibold shadow-sm border-l-4 border-slate-800"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-blue-600"
                }`}
            >
              {cat.name}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-4 pt-6 border-t border-slate-200/50">
        {/* Status Information Box */}
        <div className="bg-slate-200/60 p-4 rounded-xl border border-slate-300/40">
          <p className="font-mono text-[10px] text-cyan-700/90 font-bold mb-1.5 uppercase tracking-widest">SYSTEM STATUS</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-slate-700 font-semibold">API_STABLE_V2.4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
