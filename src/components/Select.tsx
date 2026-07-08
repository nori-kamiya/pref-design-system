import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string
  helperText?: string
  children: ReactNode
}

export function Select({ label, helperText, children, className = '', ...props }: SelectProps) {
  const id = useId()
  const helperId = helperText ? `${id}-helper` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-pref-text">
        {label}
      </label>
      <select
        id={id}
        aria-describedby={helperId}
        className={`h-11 rounded-lg border border-pref-border bg-pref-surface px-3.5 text-base text-pref-text
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pref-primary-strong
          disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
        {...props}
      >
        {children}
      </select>
      {helperText && (
        <p id={helperId} className="text-xs text-pref-text-muted">
          {helperText}
        </p>
      )}
    </div>
  )
}
