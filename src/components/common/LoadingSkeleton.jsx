import React from 'react';

export const LoadingSkeleton = ({ rows = 4, type = 'table' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="h-4 bg-slate-800 rounded w-1/3"></div>
            <div className="h-8 bg-slate-800 rounded w-1/2"></div>
            <div className="h-3 bg-slate-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/60 rounded-2xl border border-slate-800 p-4 space-y-4 animate-pulse">
      <div className="h-10 bg-slate-800/80 rounded-xl w-full"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-2">
          <div className="h-10 w-10 bg-slate-800 rounded-xl shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
            <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
          </div>
          <div className="h-6 w-20 bg-slate-800 rounded-full"></div>
          <div className="h-6 w-16 bg-slate-800 rounded"></div>
        </div>
      ))}
    </div>
  );
};
