import { Command } from "lucide-react";

interface StatsGridProps {
  ticker: number;
  ramFootprint: number;
  readersCount: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  ticker,
  ramFootprint,
  readersCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white border border-slate-200 rounded-2xl p-6.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">AVG TELEMET_LATENCY</p>
            <h2 className="font-mono text-3xl font-black text-slate-900 mt-1">{ticker}ms</h2>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold font-mono">OPTIMAL</span>
        </div>

        <div className="w-full h-10 mt-3">
          <svg viewBox="0 0 100 20" className="w-full h-full text-blue-500 overflow-visible" preserveAspectRatio="none">
            <path d="M 0,15 Q 10,8 20,12 T 40,5 T 60,11 T 80,4 T 100,10" fill="none" stroke="currentColor" strokeWidth="2" className="animate-[dash_1.5s_linear]" />
            <path d="M 0,15 Q 10,8 20,12 T 40,5 T 60,11 T 80,4 T 100,10 L 100,20 L 0,20 Z" fill="rgba(59, 130, 246, 0.08)" />
          </svg>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">RAM ALLOCATED MEMORY</p>
            <h2 className="font-mono text-3xl font-black text-slate-900 mt-1">{ramFootprint}%</h2>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 font-bold font-mono">STABLE_V8</span>
        </div>

        <div className="relative pt-1 mt-4">
          <div className="overflow-hidden h-2.5 text-xs flex rounded bg-slate-100 border border-slate-200">
            <div style={{ width: `${ramFootprint}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 rounded duration-300 transition-all" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6.5 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">SECURE CONCURRENT VERSE</p>
            <h2 className="font-mono text-3xl font-black text-slate-800 mt-1">{readersCount} devs</h2>
          </div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        <p className="text-slate-500 font-sans text-xs font-semibold leading-relaxed">
          Identity tokens synced with zero-trust credentials. Live monitoring indices.
        </p>
      </div>
    </div>
  );
};

export const DashboardHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-200 pb-8">
    <div>
      <h1 className="font-sans text-3xl font-extrabold text-slate-900">Intel Analytics Board</h1>
      <p className="font-mono text-xs font-bold text-slate-500 mt-2 tracking-wider">
        INTEGRITY_INDEX_99.87% // HARDWARE_STRETCH_RATIO_GOOD
      </p>
    </div>

    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
      <Command className="w-4 h-4 text-blue-600 animate-[spin_8s_linear_infinite]" />
      <span className="font-mono text-[10px] text-slate-600 font-bold tracking-widest uppercase">LIVE TELEMETRY ACTIVE</span>
    </div>
  </div>
);
