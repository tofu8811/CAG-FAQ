import { useEffect, useState } from "react";

export function useDashboardTelemetry() {
  const [ticker, setTicker] = useState(14.5);
  const [ramFootprint, setRamFootprint] = useState(58.3);
  const [readersCount, setReadersCount] = useState(234);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setTicker(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
      setRamFootprint(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setReadersCount(prev => prev + (Math.random() > 0.6 ? 1 : Math.random() < 0.4 ? -1 : 0));
    }, 3000);

    return () => clearInterval(statusInterval);
  }, []);

  return { ticker, ramFootprint, readersCount };
}
