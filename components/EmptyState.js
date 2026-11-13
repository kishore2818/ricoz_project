/**
 * EmptyState
 * Displays a friendly placeholder when a list or section has no data.
 *
 * Props:
 *   icon         – Lucide icon component (optional)
 *   title        – Heading text
 *   description  – Supporting description
 *   actionLabel  – Text for the CTA button (optional)
 *   onAction     – Click handler for the CTA button (optional)
 */

export default function EmptyState({
  icon: Icon,
  title = 'No data found',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
          <Icon size={28} />
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      )}

      {/* Action button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5
                     text-sm font-medium text-white shadow-sm
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
