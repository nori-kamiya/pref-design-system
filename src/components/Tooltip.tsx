import { cloneElement, useId, useRef, useState, type ReactElement } from 'react'

export function Tooltip({ label, children }: { label: string; children: ReactElement }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  return (
    <span
      ref={wrapperRef}
      className="group relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      {cloneWithDescribedBy(children, id)}
      <span
        role="tooltip"
        id={id}
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-56 -translate-x-1/2
          rounded-md bg-pref-text px-2.5 py-1.5 text-xs text-pref-surface shadow-lg transition-opacity
          motion-safe:duration-100 ${open ? 'opacity-100' : 'opacity-0'}`}
      >
        {label}
      </span>
    </span>
  )
}

function cloneWithDescribedBy(child: ReactElement, describedById: string) {
  const props = child.props as { 'aria-describedby'?: string }
  return cloneElement(child, {
    'aria-describedby': [props['aria-describedby'], describedById].filter(Boolean).join(' '),
  } as Partial<unknown>)
}
