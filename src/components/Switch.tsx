import { useId, type InputHTMLAttributes } from 'react'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: string
}

export function Switch({ label, className = '', ...props }: SwitchProps) {
  const id = useId()
  return (
    <label htmlFor={id} className="inline-flex min-h-11 cursor-pointer items-center gap-3">
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={`peer absolute inset-0 h-full w-full appearance-none rounded-full bg-pref-border
            transition-colors checked:bg-pref-primary
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pref-primary-strong
            disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0.5 size-5 rounded-full bg-white shadow transition-transform
            motion-safe:duration-150 peer-checked:translate-x-5"
        />
      </span>
      <span className="text-sm text-pref-text">{label}</span>
    </label>
  )
}
