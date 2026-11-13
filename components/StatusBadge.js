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
  uploaded:     'bg-yellow-100 text-yellow-800',
  pending:      'bg-yellow-100 text-yellow-800',
  processing:   'bg-blue-100 text-blue-800',
  completed:    'bg-emerald-100 text-emerald-800',
  approved:     'bg-emerald-100 text-emerald-800',
  verified:     'bg-emerald-100 text-emerald-800',
  'needs review': 'bg-orange-100 text-orange-800',
  draft:        'bg-orange-100 text-orange-800',
  failed:       'bg-red-100 text-red-800',
  rejected:     'bg-red-100 text-red-800',
  flagged:      'bg-purple-100 text-purple-800',
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
