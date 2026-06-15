interface CoverIllustrationProps {
  styleId: string;
  categoryName: string;
}

export const CoverIllustration: React.FC<CoverIllustrationProps> = ({
  styleId,
  categoryName
}) => {
  switch (styleId) {
    case "neural-network":
      return (
        <svg viewBox="0 0 800 320" className="w-full h-full object-cover text-blue-400 opacity-90">
          <defs>
            <radialGradient id="netGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="800" height="320" fill="url(#netGrad)" />
          <g stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3">
            <line x1="150" y1="80" x2="300" y2="120" />
            <line x1="300" y1="120" x2="450" y2="90" />
            <line x1="450" y1="90" x2="650" y2="150" />
            <line x1="150" y1="80" x2="220" y2="240" />
            <line x1="220" y1="240" x2="400" y2="210" />
            <line x1="400" y1="210" x2="520" y2="250" />
            <line x1="520" y1="250" x2="650" y2="150" />
            <line x1="300" y1="120" x2="400" y2="210" />
            <line x1="450" y1="90" x2="400" y2="210" />
            <line x1="450" y1="90" x2="520" y2="250" />
          </g>
          <g fill="#60a5fa" className="animate-pulse">
            <circle cx="150" cy="80" r="5" fill="#3b82f6" />
            <circle cx="300" cy="120" r="7" fill="#60a5fa" />
            <circle cx="450" cy="90" r="6" fill="#3b82f6" />
            <circle cx="650" cy="150" r="8" fill="#60a5fa" />
            <circle cx="220" cy="240" r="6" fill="#3b82f6" />
            <circle cx="400" cy="210" r="9" fill="#93c5fd" />
            <circle cx="520" cy="250" r="5" fill="#3b82f6" />
          </g>
          <text x="50" y="280" fontFamily="monospace" fontSize="11" fill="#64748b" letterSpacing="2">GRAPH_LATENCY_TEST_OK</text>
        </svg>
      );
    case "motherboard":
      return (
        <svg viewBox="0 0 800 320" className="w-full h-full object-cover text-amber-500 opacity-90">
          <defs>
            <linearGradient id="motherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="800" height="320" fill="url(#motherGrad)" />
          <g stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" fill="none">
            <rect x="350" y="80" width="100" height="100" rx="6" strokeWidth="2.5" />
            <path d="M 350,110 L 250,110 L 230,130" />
            <path d="M 350,150 L 220,150 L 200,170" />
            <path d="M 450,110 L 550,110 L 570,90" />
            <path d="M 450,150 L 580,150 L 600,130" />
            <path d="M 400,80 L 400,30" />
            <path d="M 400,180 L 400,260" />
          </g>
          <rect x="370" y="100" width="60" height="60" rx="3" fill="#f59e0b" fillOpacity="0.1" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="400" cy="130" r="10" fill="#fbbf24" className="animate-ping" fillOpacity="0.3" />
          <text x="50" y="280" fontFamily="monospace" fontSize="11" fill="#854d0e" letterSpacing="2">SILICON_DIE_HEAT_BOUNDS_STABLE</text>
        </svg>
      );
    case "blockchain":
      return (
        <svg viewBox="0 0 800 320" className="w-full h-full object-cover text-cyan-400 opacity-90">
          <defs>
            <radialGradient id="blockGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#083344" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="800" height="320" fill="url(#blockGrad)" />
          <g stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.4" fill="none">
            <rect x="180" y="100" width="80" height="80" rx="4" />
            <line x1="260" y1="140" x2="340" y2="140" strokeWidth="2" strokeDasharray="4" />
            <rect x="340" y="100" width="80" height="80" rx="4" strokeWidth="2.5" />
            <line x1="420" y1="140" x2="500" y2="140" strokeWidth="2" strokeDasharray="4" />
            <rect x="500" y="100" width="80" height="80" rx="4" />
          </g>
          <g fill="#22d3ee" className="font-mono text-[9px] opacity-80" letterSpacing="1">
            <text x="195" y="145">BLOCK_01</text>
            <text x="355" y="145">BLOCK_02</text>
            <text x="515" y="145">BLOCK_03</text>
          </g>
          <text x="50" y="280" fontFamily="monospace" fontSize="11" fill="#0891b2" letterSpacing="2">DISTRIBUTED_CONSENSUS_SYNCED</text>
        </svg>
      );
    case "security-gate":
      return (
        <svg viewBox="0 0 800 320" className="w-full h-full object-cover text-indigo-400 opacity-90">
          <defs>
            <linearGradient id="secGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="800" height="320" fill="url(#secGrad)" />
          <g stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.3" fill="none">
            <circle cx="400" cy="140" r="90" strokeWidth="1" strokeDasharray="6" />
            <circle cx="400" cy="140" r="60" strokeWidth="2" />
            <circle cx="400" cy="140" r="30" strokeWidth="1.5" />
            <path d="M 400,20 L 400,260" strokeOpacity="0.1" />
            <path d="M 260,140 L 540,140" strokeOpacity="0.1" />
          </g>
          <path d="M 385,115 L 415,115 L 415,150 Q 400,165 385,150 Z" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" />
          <circle cx="400" cy="135" r="4" fill="#ffffff" />
          <text x="50" y="280" fontFamily="monospace" fontSize="11" fill="#4f46e5" letterSpacing="2">RSA_KEY_PAIRS_GENERATED_ZERO_TRUST</text>
        </svg>
      );
    default:
      return (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 font-mono text-sm uppercase">
          {categoryName} Staging Environment
        </div>
      );
  }
};
