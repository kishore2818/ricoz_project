/**
 * MetricsCard
 * Reusable dashboard card that displays a single KPI metric
 * with an icon, value, subtitle, and optional trend indicator.
 *
 * Props:
 *   title          – Card heading (e.g. "Total AUM")
 *   value          – Primary metric value (e.g. "$2.4B")
 *   subtitle       – Secondary description text
 *   icon           – Lucide icon component
 *   trend          – Trend label string (e.g. "+12.5%")
 *   trendDirection – "up" | "down" | "neutral"
 *   className      – Additional Tailwind classes for the wrapper
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TREND_STYLES = {
  up:      'text-emerald-600 bg-emerald-50',
  down:    'text-red-600 bg-red-50',
  neutral: 'text-gray-500 bg-gray-100',
};

const TREND_ICONS = {
  up:      TrendingUp,
  down:    TrendingDown,
  neutral: Minus,
};

export default function MetricsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'neutral',
  className = '',
}) {
  const TrendIcon = TREND_ICONS[trendDirection] || TREND_ICONS.neutral;
  const trendClass = TREND_STYLES[trendDirection] || TREND_STYLES.neutral;

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-100 shadow-sm
        p-5 flex items-start gap-4 transition-shadow hover:shadow-md
        ${className}
      `}
    >
      {/* Icon circle */}
      {Icon && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
      )}

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 truncate">{value}</p>

        <div className="mt-1 flex items-center gap-2">
          {/* Trend pill */}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${trendClass}`}
            >
              <TrendIcon size={12} />
              {trend}
            </span>
          )}

          {/* Subtitle */}
          {subtitle && (
            <span className="text-xs text-gray-400 truncate">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
