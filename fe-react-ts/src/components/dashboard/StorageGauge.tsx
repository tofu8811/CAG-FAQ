export const StorageGauge = () => (
  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
    <h3 className="font-sans text-sm font-extrabold text-slate-900 mb-5 pb-3 border-b border-slate-100">
      STORAGE UTILIZATION
    </h3>

    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="64 36" />
        </svg>
        <div className="absolute text-center">
          <span className="block font-mono text-3xl font-black text-slate-900 leading-none">64%</span>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">6.4GB / 10GB</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-slate-100 font-mono text-[11px]">
        <div>
          <span className="block font-bold text-blue-600">6.4 GB Cached</span>
          <span className="text-slate-400">RESEARCH INDEXES</span>
        </div>
        <div>
          <span className="block font-bold text-slate-600">3.6 GB Free</span>
          <span className="text-slate-400">SPARES BUFFER</span>
        </div>
      </div>
    </div>
  </div>
);
