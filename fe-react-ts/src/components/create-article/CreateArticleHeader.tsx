import { Eye, PenTool } from "lucide-react";

interface CreateArticleHeaderProps {
  editorMode: "write" | "preview";
  setEditorMode: (mode: "write" | "preview") => void;
}

export const CreateArticleHeader: React.FC<CreateArticleHeaderProps> = ({
  editorMode,
  setEditorMode
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-slate-200 pb-5">
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.15em] font-extrabold text-slate-400 mb-2 uppercase">
        <span>ADMIN</span>
        <span className="text-slate-300 font-normal">&gt;</span>
        <span>ARTICLES</span>
        <span className="text-slate-300 font-normal">&gt;</span>
        <span className="text-blue-600 font-black">NEW</span>
      </div>
      <h1 className="font-sans text-4xl font-extrabold text-slate-900 tracking-tight leading-none animate-[fadeIn_0.2s_ease-out]">
        Create New Article
      </h1>
    </div>

    <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl shrink-0">
      <button
        type="button"
        onClick={() => setEditorMode("write")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] font-bold transition-all ${
          editorMode === "write"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <PenTool className="w-3.5 h-3.5" /> COMPOSER
      </button>
      <button
        type="button"
        onClick={() => setEditorMode("preview")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] font-bold transition-all ${
          editorMode === "preview"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <Eye className="w-3.5 h-3.5" /> LIVE_PREVIEW
      </button>
    </div>
  </div>
);
