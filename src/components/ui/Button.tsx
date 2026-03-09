import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100',
  secondary:
    'border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800',
  ghost:
    'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
};

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200';

export function Button({ href, variant = 'primary', children, className = '', onClick }: Props) {
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
