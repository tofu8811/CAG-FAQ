import React from "react";
import { Sparkles } from "lucide-react";

interface HomeHeroProps {
  typedText: string;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ typedText }) => {
  return (
    <>
      <section className="relative min-h-[340px] flex flex-col items-center justify-center py-12 px-4 rounded-3xl bg-slate-100 border border-slate-200/60 overflow-hidden mb-12">
        {/* Abstract vector dots bg decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40 -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 font-mono text-[11px] rounded-full font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> ARCHIVE_PLATFORM_V2
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">
            Precision Engineering for <span className="text-blue-600 font-black">Modern Devs</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto font-medium">
            Explore deep-dives into kernel architecture, neural networks, and the future of distributed systems.
          </p>

          {/* Terminal Search Display */}
          <div className="bg-slate-900 text-slate-100 border border-slate-705 p-1 rounded-xl shadow-lg w-full max-w-xl mx-auto">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <span className="font-mono text-[10px] text-slate-400 opacity-80">bash — research@techlabs</span>
            </div>

            <div className="p-3.5 flex items-center text-left font-mono text-sm">
              <span className="text-blue-400 mr-2.5 select-none">$</span>
              <span className="text-slate-200">{typedText}</span>
              <span className="inline-block w-2 h-4.5 bg-blue-500 ml-1 animate-[ping_1.2s_step-end_infinite]"></span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}