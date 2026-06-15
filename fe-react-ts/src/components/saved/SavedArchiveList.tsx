import { ArrowRight, X } from "lucide-react";
import { Article, SavedEntry } from "../../types";

interface SavedArchiveListProps {
  entries: SavedEntry[];
  getCategoryName: (categoryId: string) => string;
  onReadArticle: (article: Article) => void;
  onRemoveSave: (articleId: string) => void;
}

export const SavedArchiveList: React.FC<SavedArchiveListProps> = ({
  entries,
  getCategoryName,
  onReadArticle,
  onRemoveSave
}) => {
  if (entries.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6.5 shadow-sm">
      <h3 className="font-sans text-sm font-extrabold text-slate-900 mb-5 border-b border-slate-100 pb-3">Archived Indices</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 bg-slate-50/70 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-4 group transition-all duration-200">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[9px] font-bold text-blue-600 uppercase">{getCategoryName(entry.article.categoryId)}</span>
                <span className="text-slate-400 text-[8px] font-mono font-bold leading-none">{entry.savedAt}</span>
              </div>

              <h4 onClick={() => onReadArticle(entry.article)} className="font-sans text-xs sm:text-sm font-extrabold text-slate-900 truncate group-hover:text-blue-600 block cursor-pointer">
                {entry.article.title}
              </h4>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => onReadArticle(entry.article)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Read documentation">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onRemoveSave(entry.article.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded" title="Remove Bookmark">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
