/**
 * LoadingSpinner
 * Centered full-area spinner with an optional descriptive message.
 *
 * Props:
 *   message – Optional text shown below the spinner.
 */

export default function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinning SVG circle */}
      <svg
        className="h-10 w-10 animate-spin text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {message && (
        <p className="mt-4 text-sm text-gray-500">{message}</p>
      )}
    </div>
  );
}
