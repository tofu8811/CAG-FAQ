import React from "react";
import { Grid, List, Terminal } from "lucide-react";
import { Article, Category } from "../../types";
import { ArticleCard } from "../article/ArticleCard";

interface ArticleListSectionProps {
    articles: Article[];
    categories: Category[];
    viewMode: "grid" | "list";
    selectedCategory: string | null;
    onViewModeChange: (mode: "grid" | "list") => void;
    onSelectArticle: (article: Article) => void;
}

export const ArticleListSection: React.FC<ArticleListSectionProps> = ({
    articles,
    categories,
    viewMode,
    selectedCategory,
    onViewModeChange,
    onSelectArticle
}) => {
    return (
        <>
            <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                    <div className="flex items-end gap-3">
                        <h2 className="font-sans text-2xl font-bold text-slate-900 leading-none">
                            {selectedCategory ? `${selectedCategory} Articles` : "Latest Articles"}
                        </h2>
                        {articles.length > 0 && (
                            <span className="text-xs bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full font-mono font-bold font-semibold leading-none">
                                {articles.length} docs
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onViewModeChange("grid")}
                            className={`p-1.5 rounded border transition-colors ${viewMode === "grid" ? "bg-slate-200 text-blue-600 border-slate-300" : "text-slate-500 hover:bg-slate-100 border-transparent"
                                }`}
                            title="Grid view"
                        >
                            <Grid className="w-4.5 h-4.5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange("list")}
                            className={`p-1.5 rounded border transition-colors ${viewMode === "list" ? "bg-slate-200 text-blue-600 border-slate-300" : "text-slate-500 hover:bg-slate-100 border-transparent"
                                }`}
                            title="List view"
                        >
                            <List className="w-4.5 h-4.5" />
                        </button>
                    </div>
                </div>

                {articles.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
                        <Terminal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="font-sans text-lg font-bold text-slate-700">No articles match your search parameters</h3>
                        <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                            Try modifying your query or selecting another technical domain from the categories side bar.
                        </p>
                    </div>
                ) : (
                    <div className={
                        viewMode === "list"
                            ? "space-y-6"
                            : "grid grid-cols-1 md:grid-cols-2 gap-6"
                    }>
                        {articles.map((article) => (

                            // ARTICLE CARD COMPONENT
                            <ArticleCard
                                key={article.id}
                                article={article}
                                categoryName={categories.find((category) => category.id === article.categoryId)?.name ?? "Uncategorized"}
                                viewMode={viewMode}
                                onSelectArticle={onSelectArticle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
