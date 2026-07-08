import type { Prefecture } from '../tokens/generated'

export function ColorSwatch({
  prefecture,
  mode,
}: {
  prefecture: Prefecture
  mode: 'light' | 'dark'
}) {
  const t = prefecture[mode]
  return (
    <figure
      className="overflow-hidden rounded-xl border border-pref-border"
      style={{ background: t.surface }}
    >
      <div className="flex h-16" style={{ background: t.primary, color: t.onPrimary }}>
        <span className="m-auto text-sm font-semibold">{prefecture.nameJa}</span>
      </div>
      <figcaption className="space-y-1 p-3 text-xs" style={{ color: t.text }}>
        <div className="flex items-center justify-between">
          <span style={{ color: t.textMuted }}>identity</span>
          <code>{t.identity}</code>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: t.textMuted }}>primary</span>
          <code>{t.primary}</code>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: t.primaryStrong }}>primaryStrong text</span>
          <code>{t.primaryStrong}</code>
        </div>
      </figcaption>
    </figure>
  )
}
