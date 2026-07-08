export type AvatarSize = 'sm' | 'md' | 'lg'

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
}

function initials(name: string): string {
  const chars = Array.from(name.trim()).filter((c) => c.trim().length > 0)
  return chars.slice(0, 2).join('')
}

export function Avatar({
  name,
  size = 'md',
  className = '',
}: {
  name: string
  size?: AvatarSize
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-pref-primary font-semibold text-pref-on-primary ${sizes[size]} ${className}`}
    >
      {initials(name)}
    </span>
  )
}
