import { Bold, Code, Image, Italic, Link, List, Maximize2, Quote, Underline } from "lucide-react";

interface RichTextEditorProps {
  content: string;
  wordCount: number;
  setContent: (value: string) => void;
  appendMarkdown: (prefix: string, suffix: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  wordCount,
  setContent,
  appendMarkdown
}) => (
  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between h-10 select-none">
      <div className="flex items-center gap-4 text-slate-500">
        <button type="button" onClick={() => appendMarkdown("**", "**")} className="p-1 hover:text-slate-900 font-bold" title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => appendMarkdown("*", "*")} className="p-1 hover:text-slate-900 italic" title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => appendMarkdown("<u>", "</u>")} className="p-1 hover:text-slate-900" title="Underline">
          <Underline className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-[1px] bg-slate-200" />
        <button type="button" onClick={() => appendMarkdown("\n# ", "\n")} className="p-1 hover:text-slate-900 font-bold text-xs" title="Header 1">
          H1
        </button>
        <button type="button" onClick={() => appendMarkdown("\n- ", "\n")} className="p-1 hover:text-slate-900" title="List">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => appendMarkdown("\n> ", "\n")} className="p-1 hover:text-slate-900" title="Blockquote">
          <Quote className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-[1px] bg-slate-200" />
        <button type="button" onClick={() => appendMarkdown("[", "](url)")} className="p-1 hover:text-slate-900" title="Link">
          <Link className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => appendMarkdown("![alt](", ")")} className="p-1 hover:text-slate-900" title="Image">
          <Image className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => appendMarkdown("\n```python\n", "\n```\n")} className="p-1 hover:text-slate-900" title="Code block">
          <Code className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400">
        <span>WORDS: {wordCount}</span>
        <button type="button" className="hover:text-slate-700">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <textarea
      rows={15}
      placeholder="Start writing your technical masterpiece..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full bg-white p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
    />
  </div>
);
