import { ArrowRight, FolderArchive, X } from "lucide-react";
import { Article, SavedEntry } from "../../types";

interface SavedArticleCardProps {
  entry?: SavedEntry;
  variant: "primary" | "secondary";
  categoryName: string;
  onReadArticle: (article: Article) => void;
  onRemoveSave: (articleId: string) => void;
}

export const SavedArticleCard: React.FC<SavedArticleCardProps> = ({
  entry,
  variant,
  categoryName,
  onReadArticle,
  onRemoveSave
}) => {
  if (!entry && variant === "secondary") {
    return (
      <div className="lg:col-span-5 bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
        <FolderArchive className="w-12 h-12 text-slate-300 mb-2" />
        <p className="text-slate-500 text-xs font-bold font-mono">BENTO_SLOT_EMPTY</p>
        <p className="text-slate-400 text-[11px] max-w-xs mt-1">Bookmarked items will populate this auxiliary window.</p>
      </div>
    );
  }

  if (!entry) return null;

  const isPrimary = variant === "primary";

  return (
    <div className={`${isPrimary ? "lg:col-span-7" : "lg:col-span-5"} bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl duration-300 transition-all rounded-2xl overflow-hidden flex flex-col justify-between group`}>
      <div className="p-7">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className={`font-mono text-[10px] font-bold px-3 py-1 border rounded ${isPrimary ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {categoryName.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">{entry.savedAt}</span>
        </div>

        <h3
          onClick={() => onReadArticle(entry.article)}
          className={`${isPrimary ? "text-xl" : "text-base sm:text-lg"} font-sans font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 cursor-pointer transition-colors`}
        >
          {entry.article.title}
        </h3>

        <p className={`text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 ${isPrimary ? "" : "line-clamp-3"}`}>
          {entry.article.excerpt}
        </p>

        {isPrimary && (
          <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-mono text-xs font-bold text-blue-600 shadow-sm leading-none">
              {entry.article.author?.avatar}
            </div>
            <div>
              <p className="font-sans text-xs font-bold text-slate-800 leading-none">{entry.article.author?.name}</p>
              <p className="font-mono text-[9px] text-slate-400 mt-1 uppercase tracking-wider">{entry.article.author?.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 border-t border-slate-100 p-5 px-7 flex items-center justify-between">
        <button onClick={() => onReadArticle(entry.article)} className="text-blue-600 flex items-center gap-1.5 font-mono text-xs font-bold hover:underline">
          {isPrimary ? "READ DETAILED DOCS" : "READ"} <ArrowRight className="w-4.5 h-4.5" />
        </button>

        <button
          onClick={() => onRemoveSave(entry.article.id)}
          className="text-slate-400 hover:text-red-500 font-mono text-xs font-bold flex items-center gap-1 transition-colors leading-none"
          title="Remove Bookmark"
        >
          UNSAVE <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
