import React from 'react';
import { useFleet } from '../../context/FleetContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useFleet();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all animate-in slide-in-from-right duration-200 ${
              isSuccess
                ? 'bg-white dark:bg-slate-900/95 border-emerald-500/40 shadow-emerald-500/10'
                : isError
                ? 'bg-white dark:bg-slate-900/95 border-rose-500/40 shadow-rose-500/10'
                : isWarning
                ? 'bg-white dark:bg-slate-900/95 border-amber-500/40 shadow-amber-500/10'
                : 'bg-white dark:bg-slate-900/95 border-purple-500/40 shadow-purple-500/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            </div>

            <div className="flex-1 text-xs leading-relaxed text-slate-900 dark:text-slate-100 font-semibold">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
