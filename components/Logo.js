'use client';

/**
 * Institutional Brand Logo
 * Geometric prism & apex mark inspired by Carta, Allvue, and Visible.
 * Uses bulletproof vector paths with direct high-contrast vibrant fills that never glitch or become transparent.
 */

export default function Logo({
  size = 'md',
  showText = true,
  variant = 'light', // 'light' (on dark background) or 'dark' (on light background)
  className = '',
}) {
  const SIZES = {
    xs: { icon: 26, text: 'text-sm', sub: 'text-[9px]', gap: 'gap-2' },
    sm: { icon: 32, text: 'text-base', sub: 'text-[10px]', gap: 'gap-2.5' },
    md: { icon: 38, text: 'text-lg', sub: 'text-[11px]', gap: 'gap-3' },
    lg: { icon: 46, text: 'text-xl', sub: 'text-xs', gap: 'gap-3.5' },
  };

  const currentSize = SIZES[size] || SIZES.md;
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {/* Outer Glowing Gradient Tile */}
      <div
        className="relative shrink-0 p-[2px] rounded-xl bg-gradient-to-br from-teal-400 via-cyan-500 to-indigo-600 shadow-md shadow-teal-500/25"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        {/* Inner Dark Tile */}
        <div className="w-full h-full bg-[#0A0E1A] rounded-[10px] flex items-center justify-center p-1">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Left Facet: Vibrant Mint Teal */}
            <path
              d="M16 4L6 22C5.5 23 6.2 24.2 7.3 24.2H12.5L16 17.5L13.5 10L16 4Z"
              fill="#2DD4BF"
            />
            {/* Right Facet: Vibrant Electric Cyan */}
            <path
              d="M16 4L26 22C26.5 23 25.8 24.2 24.7 24.2H19.5L16 17.5L18.5 10L16 4Z"
              fill="#06B6D4"
            />
            {/* Center Core Prism: Electric Indigo */}
            <polygon
              points="16,8 19.5,15 16,22 12.5,15"
              fill="#6366F1"
            />
            {/* Upward Growth Arrow Apex: Pure White */}
            <path
              d="M16 9L18.5 14H13.5L16 9Z"
              fill="#FFFFFF"
            />
            {/* Bottom Foundation Bar: Soft Teal Accent */}
            <rect
              x="10"
              y="26"
              width="12"
              height="2"
              rx="1"
              fill="#2DD4BF"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span
            className={`font-black tracking-tight ${currentSize.text} ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            RICOZ
            <span className="text-teal-400 font-bold ml-1 tracking-normal">PE</span>
          </span>
          <span
            className={`font-semibold tracking-wider uppercase ${currentSize.sub} ${
              isLight ? 'text-teal-400' : 'text-teal-600'
            }`}
          >
            LP Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
