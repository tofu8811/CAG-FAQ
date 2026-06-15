import { Calendar, ChevronDown } from "lucide-react";
import { Category } from "../../types";

interface ArticleMetadataFormProps {
  title: string;
  excerpt: string;
  categoryId: string;
  categories: Category[];
  setTitle: (value: string) => void;
  setExcerpt: (value: string) => void;
  setCategoryId: (value: string) => void;
}

export const ArticleMetadataForm: React.FC<ArticleMetadataFormProps> = ({
  title,
  excerpt,
  categoryId,
  categories,
  setTitle,
  setExcerpt,
  setCategoryId
}) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
    <div className="space-y-2">
      <label className="block font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        ARTICLE HEADLINE
      </label>
      <input
        type="text"
        placeholder="Enter article title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-4 font-sans text-2xl font-bold text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all leading-snug"
        maxLength={110}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-2">
        <label className="block font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          CATEGORY
        </label>
        <div className="relative">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-3.5 font-sans font-semibold text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 appearance-none cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          SCHEDULE PUBLISH
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Calendar className="w-4 h-4" />
          </div>
          <input
            type="text"
            value="Now"
            disabled
            className="w-full bg-white border border-slate-200 rounded-lg pl-11 pr-4 py-3.5 font-sans text-sm font-semibold text-slate-800 outline-none cursor-default"
          />
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="block font-sans text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        EXCERPT / META DESCRIPTION
      </label>
      <textarea
        rows={3}
        placeholder="Write a short summary for SEO and feed preview..."
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3.5 font-sans text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
        maxLength={240}
      />
    </div>
  </div>
);
