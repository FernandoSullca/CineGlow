import { cn } from '@/lib/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        variant === 'primary' && 'bg-amber-500 text-neutral-950 hover:bg-amber-400',
        variant === 'secondary' && 'bg-neutral-800 text-white hover:bg-neutral-700',
        variant === 'ghost' && 'text-neutral-300 hover:bg-neutral-900',
        className,
      )}
      {...props}
    />
  );
}
