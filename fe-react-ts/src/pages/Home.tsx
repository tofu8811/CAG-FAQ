import React, { useState } from "react";
import { Article, Category, TrendingArticle } from "../types";
import { NewsletterCard } from "../components/home/NewsletterCard";
import { TrendingList } from "../components/home/TrendingList";
import { HomeHero } from "../components/home/HomeHero";
import { ArticleListSection } from "../components/home/ArticleListSection";
import { useTypewriter } from "../hooks/useTypewriter";

interface HomeProps {
  articles: Article[];
  categories: Category[];
  trendingArticles: TrendingArticle[];
  onSelectArticle: (article: Article) => void;
  selectedCategory: string | null;
  searchQuery: string
}

const heroTypewriterPhrases = [
  'find /articles --tag "quantum-computing"',
  'grep "concurrency" systems/linux.md',
  'curl -X GET api.techlabs.dev/v1/trending',
  'git log --oneline --author="AI_LAB"'
];

export const Home: React.FC<HomeProps> = ({
  articles,
  categories,
  trendingArticles,
  onSelectArticle,
  selectedCategory,
  searchQuery,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [emailSub, setEmailSub] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const typedText = useTypewriter(heroTypewriterPhrases);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub("");
    }, 4000);
  };

  // Filter criteria logic
  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ?? null;

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory ? article.categoryId === selectedCategory : true;
    const matchesSearch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  const trendingItems = trendingArticles
    .map((trend) => {
      const article = articles.find((article) => article.id === trend.articleId);

      if (!article) return null;

      return {
        id: trend.id,
        title: trend.title,
        meta: `${trend.rank} / ${trend.domain}`,
        subMeta: `${trend.views} views / ${trend.comments} comments`,
        article,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-10">

      {/* Hero Header */}
      <HomeHero typedText={typedText} />

      {/* Grid containing latest content items and trending widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Latest Articles list */}
        <ArticleListSection
          articles={filteredArticles}
          viewMode={viewMode}
          selectedCategory={selectedCategoryName}
          categories={categories}
          onViewModeChange={setViewMode}
          onSelectArticle={onSelectArticle}
        />

        {/* Dynamic side content section (Trending & Newsletter subscription) */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Trending Box List */}
          <TrendingList
            items={trendingItems}
            onSelectArticle={onSelectArticle}
          />

          {/* Subscribe Newsletter Community Card */}
          <NewsletterCard
            emailSub={emailSub}
            subSuccess={subSuccess}
            setEmailSub={setEmailSub}
            onSubscribe={handleSubscribe}
          />

        </aside>
      </div>

    </div>
  );
};
