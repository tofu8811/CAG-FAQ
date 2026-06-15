export const TrafficChart = () => (
  <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
    <h3 className="font-sans text-sm font-extrabold text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
      <span>TRAFFIC LOAD SPECTRUM</span>
      <span className="font-mono text-[9px] text-slate-400">LAST 12 HOURS</span>
    </h3>

    <div className="w-full h-64 relative bg-slate-50/50 rounded-xl border border-slate-150 p-4">
      <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
        <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
        <polyline fill="none" stroke="#2563eb" strokeWidth="3.5" points="0,180 50,150 100,120 150,140 200,90 250,70 300,110 350,50 400,90 450,40 500,20" className="animate-[dash_2s_ease-out]" />
        <polygon fill="rgba(37, 99, 235, 0.05)" points="0,180 50,150 100,120 150,140 200,90 250,70 300,110 350,50 400,90 450,40 500,20 500,200 0,200" />
        <circle cx="250" cy="70" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        <text x="250" y="55" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#1e293b" textAnchor="middle">78.4% Load</text>
      </svg>
    </div>
  </div>
);
