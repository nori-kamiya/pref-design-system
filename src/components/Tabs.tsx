import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ items, defaultTabId }: { items: TabItem[]; defaultTabId?: string }) {
  const baseId = useId()
  const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const activeIndex = items.findIndex((t) => t.id === activeId)

  function focusTab(index: number) {
    const item = items[(index + items.length) % items.length]
    setActiveId(item.id)
    tabRefs.current[item.id]?.focus()
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusTab(activeIndex + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusTab(activeIndex - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusTab(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusTab(items.length - 1)
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-1 border-b border-pref-border">
        {items.map((item) => {
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el
              }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={onKeyDown}
              className={`-mb-px min-h-11 border-b-2 px-4 text-sm font-medium transition-colors
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pref-primary-strong
                ${
                  selected
                    ? 'border-pref-primary-strong text-pref-primary-strong'
                    : 'border-transparent text-pref-text-muted hover:text-pref-text'
                }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="py-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
