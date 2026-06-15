import React from "react";

interface AuthorMetaProps {
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  readTime: string;
}

export const AuthorMeta: React.FC<AuthorMetaProps> = ({
  authorName,
  authorRole,
  authorAvatar,
  readTime }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100/80 flex items-center justify-center font-mono text-sm font-bold text-blue-600 shadow-sm">
            {authorAvatar}
          </div>
          <div>
            <p className="font-sans text-sm font-extrabold text-slate-900 leading-none">{authorName}</p>
            <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{authorRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-slate-400 font-bold">EST. READ TIME</span>
            <span className="font-mono text-xs font-extrabold text-blue-600 uppercase mt-0.5">{readTime || "14 MIN"}</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-slate-400 font-bold">DIFFICULTY</span>
            <span className="font-mono text-xs font-extrabold text-amber-600 uppercase mt-0.5">ADVANCED</span>
          </div>
        </div>
      </div>

    </>
  )
}