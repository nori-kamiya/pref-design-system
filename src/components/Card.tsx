import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tinted?: boolean
}

export function Card({ children, tinted = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-pref-border p-5 ${
        tinted ? 'bg-pref-tint-bg' : 'bg-pref-surface-alt'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
