import React from "react";
import { Heart, Share2, Download } from "lucide-react";
import { Article } from "../../types";

interface ArticleActionsProps {
    article: Article;
    isSaved: boolean;
    onToggleSave: (article: Article) => void;
    onAction: (type: string) => void;
    onNotify: (message: string) => void;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({
    article,
    isSaved,
    onToggleSave,
    onAction,
    onNotify
}) => {
    return (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <button
                onClick={() => {
                    onToggleSave(article);
                    onNotify(
                        isSaved
                            ? "Article removed from favorites shelf"
                            : "Article persisted to Favorites"
                    );
                }}
                className={`w-full font-sans text-sm font-extrabold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${isSaved
                        ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                        : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/10"
                    }`}
            >
                <Heart className={`w-4.5 h-4.5 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                {isSaved ? "REMOVE FROM FAVORITES" : "SAVE TO FAVORITES"}
            </button>

            <div className="mt-3.5 grid grid-cols-2 gap-3">
                <button
                    onClick={() => onAction("Share Link Generator")}
                    className="border border-slate-200 text-slate-700 py-2.5 rounded-lg font-mono text-[11px] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" /> SHARE
                </button>

                <button
                    onClick={() => onAction("PDF Composing")}
                    className="border border-slate-200 text-slate-700 py-2.5 rounded-lg font-mono text-[11px] font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                    <Download className="w-3.5 h-3.5 text-slate-500" /> PDF
                </button>
            </div>
        </div>
    );
};