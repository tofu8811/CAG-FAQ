import { ArrowUpRight, Trash2 } from "lucide-react";
import { Article, Category } from "../../types";

interface ArticlesTableProps {
  articles: Article[];
  categories: Category[];
  onReadArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
}

export const ArticlesTable: React.FC<ArticlesTableProps> = ({
  articles,
  categories,
  onReadArticle,
  onDeleteArticle
}) => {
  const getCategoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name ?? "Uncategorized";

  return (
    <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-sans text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <span className="p-1 px-1.5 bg-blue-50 text-blue-600 rounded text-xs font-mono font-bold leading-none">&#123;&#125;</span> Document Database Registrars
        </h3>
        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">{articles.length} records mapped</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-55 bg-slate-50 border-b border-slate-150 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4.5 px-6">ID CODE</th>
              <th className="py-4.5 px-6">DOC NAME</th>
              <th className="py-4.5 px-6">DOMAIN CATEGORY</th>
              <th className="py-4.5 px-6">STATUS</th>
              <th className="py-4.5 px-6">READ TIME</th>
              <th className="py-4.5 px-6 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 duration-150 transition-colors">
                <td className="py-4 px-6 font-mono text-[11px] font-semibold text-slate-700">
                  #{item.id.replace("custom-", "").substring(0, 6).toUpperCase()}
                </td>
                <td className="py-4 px-6">
                  <span onClick={() => onReadArticle(item)} className="font-sans text-xs sm:text-sm font-bold text-slate-950 hover:text-blue-600 cursor-pointer line-clamp-1">
                    {item.title}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 border border-blue-200/50 rounded leading-none">
                    {getCategoryName(item.categoryId).toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 select-none">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> LIVE
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-[10px] text-slate-400 font-semibold uppercase">{item.readTime}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
                    <button onClick={() => onReadArticle(item)} className="p-1 px-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold border border-blue-200/50 rounded flex items-center gap-1 transition-all text-[11px]" title="Analyze article">
                      RE-ROUTE <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button onClick={() => onDeleteArticle(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-slate-100 border border-transparent transition-colors" title="Delete record row">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
