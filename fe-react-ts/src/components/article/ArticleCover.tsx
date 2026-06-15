import React from "react";
import { Brain, Cpu, Terminal } from "lucide-react";
import { Article } from "../../types";

interface ArticleCoverProps {
  article: Article;
  categoryName: string;
  isBento?: boolean;
}

export const ArticleCover: React.FC<ArticleCoverProps> = ({ categoryName, isBento }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden shrink-0 ${isBento ? "md:w-2/5 md:border-b-0 md:border-r" : "h-44"
        }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />

      <div className="relative text-center select-none opacity-85 group-hover:scale-105 duration-500 transition-all">
        {categoryName === "Cybersecurity" && <Terminal className="w-10 h-10 text-cyan-400 mx-auto" />}
        {categoryName === "Hardware" && <Cpu className="w-11 h-11 text-amber-500 mx-auto" />}
        {categoryName === "AI & ML" && <Brain className="w-11 h-11 text-blue-400 mx-auto" />}
        {categoryName === "Web Dev" && <Terminal className="w-10 h-10 text-emerald-400 mx-auto" />}
        {categoryName === "Data Science" && <Terminal className="w-10 h-10 text-rose-400 mx-auto" />}
        <span className="block mt-2 font-mono text-[9px] tracking-widest uppercase text-slate-400">
          {categoryName}
        </span>
      </div>
    </div>
  );
};
