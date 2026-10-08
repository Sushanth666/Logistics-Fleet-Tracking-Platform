import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

/**
 * Helper to parse numeric part, prefix, suffix, and decimal precision
 */
const parseNumericString = (val) => {
  if (val === null || val === undefined) {
    return { numeric: 0, prefix: '', suffix: '', decimals: 0, valid: false };
  }
  const strVal = String(val);
  const match = strVal.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) {
    return { numeric: 0, prefix: '', suffix: strVal, decimals: 0, valid: false };
  }
  const numeric = parseFloat(match[1]);
  const prefix = strVal.slice(0, match.index);
  const suffix = strVal.slice(match.index + match[1].length);
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  return { numeric, prefix, suffix, decimals, valid: true };
};

/**
 * AnimatedNumber component
 * Smoothly runs the numbers up from 0 to target value using easeOutCubic curve.
 * Handles integers, decimals, and trailing units like % or mpg.
 */
export const AnimatedNumber = ({ value, duration = 1200, className = '' }) => {
  const parsed = parseNumericString(value);

  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsed.valid) return value;
    return `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });

  const previousValueRef = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const currentParsed = parseNumericString(value);
    if (!currentParsed.valid) {
      setDisplayValue(value);
      return;
    }

    const startValue = isFirstRender.current ? 0 : previousValueRef.current;
    isFirstRender.current = false;
    const diff = currentParsed.numeric - startValue;

    if (diff === 0) {
      setDisplayValue(value);
      previousValueRef.current = currentParsed.numeric;
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Smooth easeOutCubic curve for realistic deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumeric = startValue + diff * easeProgress;

      setDisplayValue(
        `${currentParsed.prefix}${currentNumeric.toFixed(currentParsed.decimals)}${currentParsed.suffix}`
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        previousValueRef.current = currentParsed.numeric;
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <span className={`tabular-nums font-mono-nums ${className}`}>{displayValue}</span>;
};

/**
 * Subtext component that animates any leading number smoothly (e.g. "5 currently en route")
 */
export const AnimatedSubtext = ({ text, duration = 1000 }) => {
  if (!text) return null;
  const match = String(text).match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return <span>{text}</span>;

  const num = match[1];
  const rest = match[2];

  return (
    <span>
      <AnimatedNumber value={num} duration={duration} />
      {rest}
    </span>
  );
};

export const StatCard = ({
  title,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'indigo', // 'indigo', 'violet', 'cyan', 'emerald', 'rose', 'amber'
  onClick
}) => {
  const colorMap = {
    indigo: {
      topBar: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
      gradient: 'from-purple-500/8 via-fuchsia-500/4 to-transparent',
      hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-500/50',
      iconBox: 'bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm shadow-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
      beacon: 'bg-purple-500',
      hoverShadow: 'hover:shadow-purple-500/10 dark:hover:shadow-purple-900/25'
    },
    violet: {
      topBar: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
      gradient: 'from-purple-500/8 via-fuchsia-500/4 to-transparent',
      hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-500/50',
      iconBox: 'bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm shadow-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
      beacon: 'bg-purple-500',
      hoverShadow: 'hover:shadow-purple-500/10 dark:hover:shadow-purple-900/25'
    },
    cyan: {
      topBar: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400',
      gradient: 'from-cyan-500/8 via-blue-500/4 to-transparent',
      hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-500/50',
      iconBox: 'bg-cyan-100 text-cyan-800 border-cyan-200/90 shadow-sm shadow-cyan-500/20 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30',
      beacon: 'bg-cyan-500',
      hoverShadow: 'hover:shadow-cyan-500/10 dark:hover:shadow-cyan-900/25'
    },
    emerald: {
      topBar: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400',
      gradient: 'from-emerald-500/8 via-teal-500/4 to-transparent',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-500/50',
      iconBox: 'bg-emerald-100 text-emerald-800 border-emerald-200/90 shadow-sm shadow-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30',
      beacon: 'bg-emerald-500',
      hoverShadow: 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/25'
    },
    rose: {
      topBar: 'bg-gradient-to-r from-rose-500 via-pink-500 to-red-500',
      gradient: 'from-rose-500/8 via-pink-500/4 to-transparent',
      hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-500/50',
      iconBox: 'bg-rose-100 text-rose-800 border-rose-200/90 shadow-sm shadow-rose-500/20 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30',
      beacon: 'bg-rose-500',
      hoverShadow: 'hover:shadow-rose-500/10 dark:hover:shadow-rose-900/25'
    },
    amber: {
      topBar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400',
      gradient: 'from-amber-500/8 via-orange-500/4 to-transparent',
      hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-500/50',
      iconBox: 'bg-amber-100 text-amber-800 border-amber-200/90 shadow-sm shadow-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30',
      beacon: 'bg-amber-500',
      hoverShadow: 'hover:shadow-amber-500/10 dark:hover:shadow-amber-900/25'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${scheme.hoverBorder} ${scheme.hoverShadow} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top Radiant Highlight Bar with Animation on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${scheme.topBar} opacity-85 group-hover:opacity-100 group-hover:h-2 transition-all duration-300`} />

      {/* Ambient background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="space-y-2">
          {/* Header Title with subtle tracking */}
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${scheme.beacon} opacity-70 group-hover:opacity-100 transition-opacity`} />
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {title}
            </p>
          </div>

          {/* Metric Value with Smooth Number Running Animation & Trend Badge */}
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-purple-800 dark:group-hover:from-white dark:group-hover:to-purple-200 transition-colors">
              <AnimatedNumber value={value} duration={1100} />
            </span>

            {change !== undefined && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-transform duration-300 group-hover:scale-105 ${
                  isPositive
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                    : 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 animate-pulse'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <AnimatedNumber value={change} duration={1100} />
              </span>
            )}
          </div>

          {/* Subtext with high-contrast text & animated number */}
          {subtext && (
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              <AnimatedSubtext text={subtext} duration={1000} />
            </p>
          )}
        </div>

        {/* Action / Telematics Icon with Micro-Animation on Hover */}
        {Icon && (
          <div className="relative shrink-0">
            <div
              className={`p-3 rounded-2xl border transition-all duration-300 ${scheme.iconBox} group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md`}
            >
              <Icon className="w-6 h-6 transition-transform duration-300" />
            </div>

            {/* Extra Pulsing Dot for Alert Cards */}
            {!isPositive && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
