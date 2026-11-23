import Link from 'next/link';

const VARIANTS = {
  primary:
    'bg-teal-600 hover:bg-teal-500 text-white shadow-sm shadow-teal-600/25 active:bg-teal-700',
  secondary:
    'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs active:bg-slate-100',
  accent:
    'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-sm shadow-cyan-500/25',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20',
  ghost:
    'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-base rounded-xl',
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  href,
  icon: Icon,
  loading = false,
  type = 'button',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  const cls = `${base} ${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size] || SIZES.md} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls} {...rest}>
        {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? <Spinner /> : Icon ? <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" /> : null}
      {children}
    </button>
  );
}
