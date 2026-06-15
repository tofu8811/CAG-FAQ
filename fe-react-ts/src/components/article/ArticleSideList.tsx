import React from "react";
import { LucideIcon, Terminal } from "lucide-react";

export interface ArticleSideListItem {
  id: string;
  articleId?: string;
  title: string;
  meta: string;
  subMeta?: string;
}

interface ArticleSideListProps {
  title: string;
  items: ArticleSideListItem[];
  onItemClick: (item: ArticleSideListItem) => void;
  icon?: LucideIcon;
}

export const ArticleSideList: React.FC<ArticleSideListProps> = ({
  title,
  items,
  onItemClick,
  icon: Icon = Terminal
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
        <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="font-sans text-base font-bold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="p-4 bg-slate-50 border-l-2 border-slate-200 hover:border-blue-600 hover:bg-slate-100/80 cursor-pointer rounded-r-lg group transition-all duration-200"
          >
            <span className="font-mono text-[11px] text-slate-400 font-bold block mb-1">
              {item.meta}
            </span>

            <h4 className="font-sans text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.title}
            </h4>

            {item.subMeta && (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] mt-2 font-medium">
                <span>{item.subMeta}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
