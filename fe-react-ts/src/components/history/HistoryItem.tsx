import React from "react";
import { ArrowRight, Clock, X } from "lucide-react";
import { Article, HistoryEntry } from "../../types";

interface HistoryItemProps {
    entry: HistoryEntry;
    variant: "today" | "yesterday";
    categoryName: string;
    onRevisit: (article: Article) => void;
    onRemoveEntry: (id: string) => void;
    onToast: (message: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
    entry,
    variant,
    categoryName,
    onRevisit,
    onRemoveEntry,
    onToast
}) => {
    const categoryClass =
        variant === "today"
            ? "bg-blue-50 text-blue-700 border-blue-100"
            : "bg-slate-100 text-slate-600 border-slate-200";

    const coverTextClass = variant === "today" ? "text-cyan-400" : "text-emerald-400";

    return (
        <div className="interactive-card bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg rounded-xl p-5 flex flex-col md:flex-row gap-5 items-center transition-all duration-300 group">
            <div
                onClick={() => onRevisit(entry.article)}
                className={`w-full md:w-44 h-28 bg-gradient-to-tr from-slate-900 to-slate-800 ${coverTextClass} font-mono text-[11px] font-bold rounded-lg shrink-0 flex items-center justify-center relative cursor-pointer group`}
            >
                <span className="opacity-80 group-hover:scale-105 duration-200">
                    {categoryName.toUpperCase()}
                </span>
            </div>

            <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border font-bold ${categoryClass}`}>
                        {categoryName}
                    </span>

                    <span className="font-mono text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {entry.viewedAt}
                    </span>
                </div>

                <h3
                    onClick={() => onRevisit(entry.article)}
                    className="font-sans text-base font-extrabold text-slate-900 mb-1.5 hover:text-blue-600 cursor-pointer"
                >
                    {entry.article.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm line-clamp-1 leading-relaxed mb-4">
                    {entry.article.excerpt}
                </p>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-3">
                    <button
                        onClick={() => onRevisit(entry.article)}
                        className="text-blue-600 font-mono text-[10px] font-bold hover:underline flex items-center gap-1 leading-none"
                    >
                        REVISIT <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={() => {
                            onRemoveEntry(entry.id);
                            onToast("Entry removed from cache");
                        }}
                        className="text-slate-400 hover:text-red-500 font-mono text-[10px] font-bold flex items-center gap-1 leading-none transition-colors"
                    >
                        REMOVE <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
