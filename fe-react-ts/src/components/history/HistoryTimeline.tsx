import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Article, Category, HistoryEntry } from "../../types";
import { HistoryItem } from "./HistoryItem";

interface HistoryTimelineProps {
  title: string;
  variant: "today" | "yesterday";
  entries: HistoryEntry[];
  categories: Category[];
  onRevisit: (article: Article) => void;
  onRemoveEntry: (id: string) => void;
  onToast: (message: string) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  title,
  variant,
  entries,
  categories,
  onRevisit,
  onRemoveEntry,
  onToast
}) => {
  if (entries.length === 0) return null;

  const isToday = variant === "today";
  const Icon = isToday ? Calendar : Clock;

  const iconWrapperClass = isToday
    ? "bg-blue-600 text-white"
    : "bg-slate-300 text-slate-600";

  const titleClass = isToday ? "text-blue-600" : "text-slate-600";

  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className={`w-10 h-10 rounded-full border-4 border-slate-50 flex items-center justify-center shrink-0 z-10 shadow-sm ${iconWrapperClass}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>

        <h2 className={`font-sans text-lg font-bold leading-none ${titleClass}`}>
          {title}
        </h2>

        <div className="h-px flex-1 bg-slate-200/60 font-semibold"></div>
      </div>

      <div className="pl-12 space-y-4">
        {entries.map((entry) => (
          <HistoryItem
            key={entry.id}
            entry={entry}
            variant={variant}
            categoryName={categories.find((category) => category.id === entry.article.categoryId)?.name ?? "Uncategorized"}
            onRevisit={onRevisit}
            onRemoveEntry={onRemoveEntry}
            onToast={onToast}
          />
        ))}
      </div>
    </div>
  );
};
