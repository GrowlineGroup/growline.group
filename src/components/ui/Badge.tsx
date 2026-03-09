interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'light';
}

export function Badge({ children, variant = 'default' }: Props) {
  const styles = {
    default:
      'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400',
    light:
      'border-white/20 bg-white/10 text-white',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
