import React from "react";
import { ArrowRight } from "lucide-react";
import { Article } from "../../types";
import { ArticleCover } from "./ArticleCover";

interface ArticleCardProps {
  article: Article;
  categoryName: string;
  viewMode: "grid" | "list";
  onSelectArticle: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  categoryName,
  viewMode,
  onSelectArticle
}) => {
  const isBento = article.id === "llm-quant" && viewMode === "grid";

  return (
    <div
      className={`group bg-white border border-slate-200/95 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 duration-300 transition-all flex flex-col ${
        isBento ? "md:col-span-2 md:flex-row" : ""
      }`}
      onClick={() => onSelectArticle(article)}
    >
      <ArticleCover article={article} categoryName={categoryName} isBento={isBento} />

      <div className="p-6.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="font-mono text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              {categoryName.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-slate-400 font-semibold">
              {article.readTime}
            </span>
          </div>

          <h3 className="font-sans text-lg font-bold text-slate-950 mb-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">
            {article.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-mono text-xs font-bold text-blue-600">
              {article.author.avatar}
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800 leading-none">
                {article.author.name}
              </p>
              <p className="font-mono text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">
                {article.date}
              </p>
            </div>
          </div>

          {isBento && (
            <button className="text-blue-600 flex items-center gap-1.5 font-mono text-xs font-bold group-hover:gap-2.5 duration-200 transition-all">
              READ FULL DOC <ArrowRight className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
