import React, { useEffect } from "react";
import { ViewTab, Category } from "../types";
import { TopNav } from "../components/layout/TopNav.tsx";
import { Sidebar } from "../components/layout/Sidebar.tsx";

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onSearchClick?: () => void;
  searchVal?: string;
  setSearchVal?: (val: string) => void;
  categories: Category[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  sidebarOpen,
  setSidebarOpen,
  onSearchClick,
  searchVal,
  setSearchVal,
  categories = []
}) => {
  // Support Ctrl+B to toggle the sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (onSearchClick) onSearchClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, setSidebarOpen, onSearchClick]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans flex flex-col antialiased">
      {/* TopNavBar */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />

      {/* Main Containers */}
      <div className="flex flex-1 pt-[112px] md:pt-16">
        {/* SideNavBar */}
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          categories={categories}
        />

        {/* Content Render Stage */}
        <div
          id="main-content"
          className={`flex-1 transition-all duration-300 w-full ${sidebarOpen ? "lg:ml-[260px]" : "ml-0"
            }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
