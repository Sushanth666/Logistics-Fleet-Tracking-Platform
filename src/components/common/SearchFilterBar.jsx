import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

export const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search by ID, name, location...",
  statusFilter,
  onStatusChange,
  statusOptions = [],
  secondaryFilter,
  onSecondaryChange,
  secondaryOptions = [],
  secondaryLabel = "Filter",
  locationFilter,
  onLocationChange,
  locationOptions = [],
  dateFilter,
  onDateChange,
  dateOptions = [],
  onReset,
  totalResults,
  actions
}) => {
  const hasActiveFilters = Boolean(
    (searchQuery && searchQuery.trim() !== '') ||
    (statusFilter && statusFilter !== 'all') ||
    (secondaryFilter && secondaryFilter !== 'all') ||
    (locationFilter && locationFilter !== 'all') ||
    (dateFilter && dateFilter !== 'all')
  );

  return (
    <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md mb-6 space-y-3">
      <div className="flex flex-col xl:flex-row gap-3.5 items-stretch xl:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 w-full min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          {statusOptions.length > 0 && (
            <div className="relative flex-1 min-w-[140px] xl:flex-initial">
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="w-full xl:w-auto bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 cursor-pointer shadow-sm transition-all hover:border-purple-300 dark:hover:border-slate-700"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {secondaryOptions.length > 0 && (
            <div className="relative flex-1 min-w-[140px] xl:flex-initial">
              <select
                value={secondaryFilter}
                onChange={(e) => onSecondaryChange(e.target.value)}
                className="w-full xl:w-auto bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 cursor-pointer shadow-sm transition-all hover:border-purple-300 dark:hover:border-slate-700"
              >
                <option value="all">All {secondaryLabel}</option>
                {secondaryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {locationOptions.length > 0 && (
            <div className="relative flex-1 min-w-[140px] xl:flex-initial">
              <select
                value={locationFilter}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full xl:w-auto bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 cursor-pointer shadow-sm transition-all hover:border-purple-300 dark:hover:border-slate-700"
              >
                <option value="all">All Locations / Hubs</option>
                {locationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}

          {dateOptions.length > 0 && (
            <div className="relative flex-1 min-w-[140px] xl:flex-initial">
              <select
                value={dateFilter}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full xl:w-auto bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-600 cursor-pointer shadow-sm transition-all hover:border-purple-300 dark:hover:border-slate-700"
              >
                <option value="all">All Dates / Timeframes</option>
                {dateOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 transition-all cursor-pointer shadow-sm"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}

          {actions}
        </div>
      </div>

      {/* Results summary counter */}
      {totalResults !== undefined && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60 px-1">
          <span>
            Showing <strong className="text-slate-900 dark:text-white font-bold">{totalResults}</strong> result{totalResults === 1 ? '' : 's'}
            {hasActiveFilters && <span className="text-purple-600 dark:text-purple-400 ml-1.5 font-semibold">(Filtered)</span>}
          </span>
        </div>
      )}
    </div>
  );
};
