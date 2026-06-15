import { PenTool, Sparkles } from "lucide-react";
import { CoverIllustration } from "./CoverIllustration";

interface ArticlePreviewProps {
  title: string;
  excerpt: string;
  content: string;
  selectedCover: string;
  selectedCategoryName: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  activeReadTimeStr: string;
  parsedTags: string[];
  hashDigest: string;
  onBackToComposer: () => void;
  onPublish: (event: React.FormEvent) => void;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  title,
  excerpt,
  content,
  selectedCover,
  selectedCategoryName,
  authorName,
  authorRole,
  authorInitials,
  activeReadTimeStr,
  parsedTags,
  hashDigest,
  onBackToComposer,
  onPublish
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-[fadeIn_0.2s_ease-out] p-6 sm:p-10 md:p-16 max-w-[1000px] mx-auto">
      <div className="w-full h-44 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 relative mb-8">
        <div className="absolute inset-0 bg-slate-900 z-0">
          <CoverIllustration styleId={selectedCover} categoryName={selectedCategoryName} />
        </div>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-50 text-blue-700 px-3 py-0.5 rounded font-mono text-[11px] font-bold border border-blue-200">
            {selectedCategoryName.toUpperCase().replace(/\s+/g, "_")}_V4
          </span>
          <span className="text-slate-400 font-mono text-[11px] font-bold">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()}
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6 leading-tight">
          {title || "Untitled Staging Document"}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-mono text-sm font-bold text-blue-600 shadow-sm">
              {authorInitials.trim().toUpperCase() || "AT"}
            </div>
            <div>
              <p className="font-sans text-sm font-extrabold text-slate-900 leading-none">{authorName || "Dr. Aris Thorne"}</p>
              <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider leading-none">
                {authorRole || "Senior ML Architect @ TECH_LABS"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-slate-400 font-bold">EST. READ TIME</span>
              <span className="font-mono text-xs font-black text-blue-600 uppercase mt-0.5">{activeReadTimeStr}</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] text-slate-400 font-bold">STATUS</span>
              <span className="font-mono text-xs font-black text-emerald-600 uppercase mt-0.5">DRAFT_COMPILED</span>
            </div>
          </div>
        </div>
      </header>

      <div className="text-slate-700 font-sans text-base leading-relaxed space-y-6">
        {excerpt && (
          <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl font-medium text-slate-800 text-sm leading-relaxed mb-6">
            <span className="font-mono text-[10px] font-bold text-blue-600 block mb-1">ABSTRACT SYNOPSIS:</span>
            {excerpt}
          </div>
        )}

        {content ? (
          <div className="space-y-4">
            {content.split("\n\n").map((chunk, idx) => {
              const trimmed = chunk.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith("### ")) {
                return <h4 key={idx} className="font-sans text-lg font-bold text-slate-900 pt-3 mb-1">{trimmed.substring(4)}</h4>;
              }
              if (trimmed.startsWith("## ")) {
                return <h3 key={idx} className="font-sans text-xl font-bold text-slate-900 pt-4 mb-2 border-b border-slate-100 pb-1">{trimmed.substring(3)}</h3>;
              }
              if (trimmed.startsWith("# ")) {
                return <h2 key={idx} className="font-sans text-2xl font-black text-slate-900 pt-5 mb-2">{trimmed.substring(2)}</h2>;
              }
              if (trimmed.startsWith("> ")) {
                return <blockquote key={idx} className="border-l-4 border-slate-300 pl-4 py-1 italic text-slate-600 my-4">{trimmed.substring(2)}</blockquote>;
              }
              if (trimmed.startsWith("```")) {
                const lines = trimmed.split("\n");
                const innerCode = lines.slice(1, lines.length - 1).join("\n");
                return (
                  <div key={idx} className="my-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-md">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    <div className="flex justify-between items-center bg-slate-800/60 px-5 py-2.5 border-b border-slate-850">
                      <span className="font-mono text-[10px] font-bold text-slate-400">STAGE/COMPILED_CODE_BLOCK</span>
                    </div>
                    <pre className="font-mono text-xs text-slate-300 p-5 overflow-x-auto leading-relaxed scrollbar-thin">
                      <code>{innerCode || trimmed}</code>
                    </pre>
                  </div>
                );
              }

              return <p key={idx} className="text-slate-700 leading-relaxed text-sm.5 text-justify">{trimmed}</p>;
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <PenTool className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-500 animate-bounce" />
            <p className="font-mono text-xs">AWAITING_CONTENT_ELEMENTS // EDITOR_BUFFER_EMPTY</p>
            <button onClick={onBackToComposer} className="mt-3 text-xs text-blue-600 font-bold hover:underline font-mono">
              RETURN_TO_EDITOR
            </button>
          </div>
        )}
      </div>

      {parsedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-slate-100">
          {parsedTags.map(tag => (
            <span key={tag} className="font-mono text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1 border border-slate-200 rounded">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <span className="font-mono text-[10px] text-slate-400 font-bold">
          CONVERGING DRAFT PARAMETERS OK // SHA: {hashDigest}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToComposer}
            className="font-mono text-xs px-5 py-2.5 border border-slate-200 text-slate-600 font-bold hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            BACK TO COMPOSER
          </button>
          <button
            type="button"
            onClick={onPublish}
            className="font-mono text-xs px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> PUBLISH SYSTEM DOCS
          </button>
        </div>
      </div>
    </div>
  );
};
