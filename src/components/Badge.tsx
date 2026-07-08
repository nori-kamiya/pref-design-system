import type { HTMLAttributes, ReactNode } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function Badge({ children, className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-pref-tint-bg px-2.5 py-1 text-xs font-semibold text-pref-primary-strong ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
