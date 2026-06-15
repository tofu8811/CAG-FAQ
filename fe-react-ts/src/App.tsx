import React, { useState } from "react";
import { useToast } from "./contexts/ToastContext";
import { ViewTab, Article, HistoryEntry, SavedEntry, Category } from "./types";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { ArticleDetail } from "./pages/ArticleDetail";
import { History } from "./pages/History";
import { Saved } from "./pages/Saved";
import { CreateArticle } from "./pages/CreateArticle";
import { Dashboard } from "./pages/Dashboard";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_HISTORY, INITIAL_SAVED, TRENDING_ARTICLES } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>("Home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // States backing our virtual client database
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [saved, setSaved] = useState<SavedEntry[]>(INITIAL_SAVED);

  // Selected detail article holder
  const [selectedArticle, setSelectedArticle] = useState<Article>(INITIAL_ARTICLES[3]); // Default is the Latency optimization article

  // Mock database tables until the API is wired.
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [trendingArticles] = useState(TRENDING_ARTICLES);

  const { triggerToast } = useToast();

  // Selects an article to read: switches view to Detail and logs to History sequence
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveTab("Detail");

    // Add viewing entries inside History
    const alreadyExists = history.some(h => h.article.id === article.id);
    if (!alreadyExists) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false }) + " UTC";
      const newHist: HistoryEntry = {
        id: `hist-${Date.now()}`,
        article: article,
        viewedAt: timeStr,
        dateGroup: "Today"
      };
      setHistory(prev => [newHist, ...prev]);
    }
  };

  // Toggle bookmark saved structures
  const handleToggleSave = (article: Article) => {
    const isCurrentlySaved = saved.some(s => s.article.id === article.id);
    if (isCurrentlySaved) {
      setSaved(prev => prev.filter(s => s.article.id !== article.id));
    } else {
      const newSave: SavedEntry = {
        id: `save-${Date.now()}`,
        article: article,
        savedAt: "SAVED JUST NOW"
      };
      setSaved(prev => [newSave, ...prev]);
    }
  };

  // Delete article row from controller lists & dynamic indexes
  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
    // clean from bookmark nodes
    setSaved(prev => prev.filter(s => s.article.id !== id));
    // clean from history tracing
    setHistory(prev => prev.filter(h => h.article.id !== id));
  };

  // Remove single history log trace
  const handleRemoveHistory = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  // Clear all reading history
  const handleClearHistory = () => {
    setHistory([]);
  };

  // Add historical archived mock logs
  const handleRetrieveOlderLogs = () => {
    // Add latency, webassembly etc.
    const restored: HistoryEntry[] = [
      {
        id: `hist-restored-${Date.now()}-1`,
        article: articles[0], // ZK Proofs
        viewedAt: "10:24:12 UTC",
        dateGroup: "Yesterday"
      },
      {
        id: `hist-restored-${Date.now()}-2`,
        article: articles[1], // ARM vs x86
        viewedAt: "08:12:33 UTC",
        dateGroup: "Yesterday"
      }
    ];
    setHistory(prev => [...prev, ...restored]);
  };

  // Publish new custom article to grid pool
  const handlePublishArticle = (newArt: Article) => {
    setArticles(prev => [newArt, ...prev]);
  };

  const isSaved = (articleId: string) => saved.some(s => s.article.id === articleId);

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onSearchClick={() => triggerToast("Search Command Palette Active: Input query above.")}
      searchVal={searchVal}
      setSearchVal={setSearchVal}
      categories={categories}
    >
      <main className="min-h-[calc(100vh-64px)]">
        {/* Render pages depending on the state */}
        {activeTab === "Home" && (
          <Home
            articles={articles}
            categories={categories}
            trendingArticles={trendingArticles}
            onSelectArticle={handleSelectArticle}
            selectedCategory={selectedCategory}
            searchQuery={searchVal}
          />
        )}

        {activeTab === "Detail" && selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setActiveTab("Home")}
            isSaved={isSaved(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            onSelectRelated={handleSelectArticle}
            articlesPool={articles}
            categories={categories}
          />
        )}

        {activeTab === "History" && (
          <History
            historyEntries={history}
            categories={categories}
            onRemoveEntry={handleRemoveHistory}
            onClearHistory={handleClearHistory}
            onRevisit={handleSelectArticle}
            onRetrieveOlder={handleRetrieveOlderLogs}
          />
        )}

        {activeTab === "Saved" && (
          <Saved
            savedEntries={saved}
            categories={categories}
            onRemoveSave={(articleId) => {
              const article = saved.find((entry) => entry.article.id === articleId)?.article;
              if (article) handleToggleSave(article);
            }}
            onReadArticle={handleSelectArticle}
          />
        )}

        {activeTab === "Create" && (
          <CreateArticle
            onPublish={handlePublishArticle}
            setActiveTab={setActiveTab}
            categories={categories}
          />
        )}

        {activeTab === "Dashboard" && (
          <Dashboard
            articles={articles}
            categories={categories}
            onDeleteArticle={handleDeleteArticle}
            onReadArticle={handleSelectArticle}
          />
        )}
      </main>


    </MainLayout>
  );
}

// chia App thành hook hoặc context