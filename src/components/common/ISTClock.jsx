import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const ISTClock = ({ className = '' }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const istOptions = { timeZone: 'Asia/Kolkata' };

  const timeStr = now.toLocaleTimeString('en-IN', {
    ...istOptions,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const [timeMain = '', period = ''] = timeStr.split(' ');

  const dateStr = now.toLocaleDateString('en-IN', {
    ...istOptions,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      className={`w-full flex items-center justify-center gap-3 px-3 py-2 rounded-2xl border border-purple-200/90 dark:border-purple-500/25 bg-gradient-to-r from-purple-50/70 via-white dark:via-slate-800/80 to-purple-50/50 dark:from-slate-800/90 dark:to-purple-950/40 shadow-xs shadow-purple-500/5 transition-all hover:border-purple-300 dark:hover:border-purple-500/40 group ${className}`}
      title="Indian Standard Time (IST - Asia/Kolkata)"
    >
      {/* Live Beacon Dot & Clock Icon */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center" title="Live Clock Stream Active">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-sm shadow-emerald-500/50" />
        </span>
        <div className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:scale-105 transition-transform shadow-2xs">
          <Clock className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Time & Date Display (Clean Left-Aligned Stack) */}
      <div className="flex flex-col items-start leading-none min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-bold font-mono tracking-tight tabular-nums text-slate-900 dark:text-slate-100">
            {timeMain}
          </span>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 px-1 py-0.5 rounded leading-none">
            {period}
          </span>
          <span className="text-[9.5px] font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider">
            IST
          </span>
        </div>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 font-mono tracking-tight">
          {dateStr}
        </span>
      </div>
    </div>
  );
};
