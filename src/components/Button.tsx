import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'strong' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-pref-primary-strong'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm min-w-9',
  md: 'h-11 px-5 text-base min-w-11',
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-pref-primary text-pref-on-primary hover:brightness-105 active:brightness-95',
  strong:
    'bg-pref-tint-bg text-pref-primary-strong border border-pref-tint-border hover:bg-pref-tint-border/40',
  ghost: 'bg-transparent text-pref-primary-strong hover:bg-pref-tint-bg',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          className="size-4 rounded-full border-2 border-current border-t-transparent motion-safe:animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
