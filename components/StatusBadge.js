/**
 * StatusBadge
 * Renders a coloured pill / badge that communicates a status at a glance.
 *
 * Props:
 *   status – Status string (case-insensitive).
 *   size   – "sm" (default) or "md".
 *
 * Colour mapping:
 *   yellow  → Uploaded, Pending
 *   blue    → Processing
 *   green   → Completed, Approved, Verified
 *   orange  → Needs Review, Draft
 *   red     → Failed, Rejected
 *   purple  → Flagged
 *   gray    → fallback for unknown statuses
 */

const COLOR_MAP = {
  uploaded:     'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  pending:      'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  processing:   'bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-600/20',
  completed:    'bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20',
  approved:     'bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20',
  verified:     'bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20',
  'needs review': 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
  draft:        'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20',
  failed:       'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
  rejected:     'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
  flagged:      'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20',
};

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export default function StatusBadge({ status, size = 'sm' }) {
  const key = (status || '').toLowerCase().trim();
  const colorClass = COLOR_MAP[key] || 'bg-gray-100 text-gray-700';
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.sm;

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${colorClass} ${sizeClass}`}
    >
      {status}
    </span>
  );
}
