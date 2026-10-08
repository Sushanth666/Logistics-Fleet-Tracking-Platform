import React from 'react';
import { PackageOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "No records found",
  description = "Try adjusting your search criteria or add a new record to get started.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-purple-600 dark:text-purple-400 mb-4 ring-1 ring-purple-500/10">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
