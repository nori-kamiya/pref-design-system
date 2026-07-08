import { useId, type InputHTMLAttributes } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  helperText?: string
  errorText?: string
}

export function Input({ label, helperText, errorText, className = '', ...props }: InputProps) {
  const id = useId()
  const helperId = helperText ? `${id}-helper` : undefined
  const errorId = errorText ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-pref-text">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
        aria-errormessage={errorId}
        className={`h-11 rounded-lg border border-pref-border bg-pref-surface px-3.5 text-base text-pref-text
          placeholder:text-pref-text-muted
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pref-primary-strong
          user-invalid:border-status-danger-border user-invalid:bg-status-danger-bg
          disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
        {...props}
      />
      {helperText && (
        <p id={helperId} className="text-xs text-pref-text-muted">
          {helperText}
        </p>
      )}
      {errorText && (
        <p id={errorId} className="flex items-center gap-1 text-xs text-status-danger-fg">
          <span aria-hidden="true">⚠</span> {errorText}
        </p>
      )}
    </div>
  )
}
