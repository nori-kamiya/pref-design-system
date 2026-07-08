/**
 * Contrast-safe semantic token derivation.
 *
 * Input is a single "identity color" per prefecture (sampled from a symbol
 * mark / flag / JAPAN COLOR traditional swatch / meibutsu). Many of those
 * source colors are pale (kanpyō beige, melon green, …) and are NOT safe to
 * use directly as text or button-fill colors. This module derives a full
 * accessible token set from that one identity color instead of hand-tuning
 * each prefecture by eye.
 */
import {
  converter,
  formatHex,
  wcagContrast,
  clampChroma,
  type Oklch,
} from 'culori'

const toOklch = converter('oklch')

const WHITE = '#ffffff'
const BLACK = '#0a0a0a'

const AA_TEXT = 4.5
const AA_UI = 3.0

// Some source identities (soil, plaster, pearl, charcoal, …) are almost
// achromatic. Used raw they render as flat gray/brown blobs that read as
// "no color" rather than as that prefecture's color. Everywhere the identity
// feeds a brand-facing token (primary, primaryStrong, tints — NOT the
// `identity` swatch itself, which stays the authentic sourced value), it's
// floored to a minimum chroma so the hue stays legible as a color.
const MIN_BRAND_CHROMA = 0.09

function oklch(l: number, c: number, h: number | undefined): Oklch {
  return clampChroma({ mode: 'oklch', l, c, h: h ?? 0 }, 'oklch')
}

function hex(o: Oklch): string {
  return formatHex(o)
}

/** Step lightness toward `direction` until contrast against `against` reaches `min`. */
function pushToContrast(
  base: Oklch,
  against: string,
  min: number,
  direction: 'lighten' | 'darken',
  opts: { minL?: number; maxL?: number; step?: number } = {},
): Oklch {
  const step = opts.step ?? 0.01
  const floor = opts.minL ?? 0.06
  const ceil = opts.maxL ?? 0.97
  const bound = direction === 'darken' ? floor : ceil
  let candidate = { ...base, l: Math.min(Math.max(base.l, floor), ceil) }
  let guard = 0
  while (wcagContrast(hex(candidate), against) < min && guard < 200) {
    candidate.l += direction === 'darken' ? -step : step
    if (direction === 'darken' && candidate.l <= bound) {
      candidate.l = bound
      candidate = clampChroma(candidate, 'oklch')
      break
    }
    if (direction === 'lighten' && candidate.l >= bound) {
      candidate.l = bound
      candidate = clampChroma(candidate, 'oklch')
      break
    }
    candidate = clampChroma(candidate, 'oklch')
    guard++
  }
  return candidate
}

/**
 * Pick a fill color as close as possible to `src`'s own lightness that can
 * legibly host either white or black text, staying within [bounds.min,
 * bounds.max] so it also stays visually separated from the mode's surface.
 * Prefers whichever text-color direction requires the smaller nudge, so a
 * naturally dark identity stays dark (white text) and a naturally light one
 * stays light (black text) instead of both regressing to the same tone.
 */
function resolveFace(
  src: Oklch,
  bounds: { min: number; max: number },
): { fill: Oklch; onFill: string } {
  const l0 = Math.min(Math.max(src.l, bounds.min), bounds.max)
  const candidate = clampChroma({ ...src, l: l0 }, 'oklch')
  const cw = wcagContrast(hex(candidate), WHITE)
  const cb = wcagContrast(hex(candidate), BLACK)
  if (Math.max(cw, cb) >= AA_TEXT) {
    return { fill: candidate, onFill: cw >= cb ? WHITE : BLACK }
  }

  const darkened = pushToContrast(candidate, WHITE, AA_TEXT, 'darken', {
    minL: bounds.min,
    maxL: bounds.max,
  })
  const lightened = pushToContrast(candidate, BLACK, AA_TEXT, 'lighten', {
    minL: bounds.min,
    maxL: bounds.max,
  })
  const darkenedOk = wcagContrast(hex(darkened), WHITE) >= AA_TEXT
  const lightenedOk = wcagContrast(hex(lightened), BLACK) >= AA_TEXT

  if (darkenedOk && (!lightenedOk || Math.abs(darkened.l - l0) <= Math.abs(lightened.l - l0))) {
    return { fill: darkened, onFill: WHITE }
  }
  if (lightenedOk) {
    return { fill: lightened, onFill: BLACK }
  }
  // Bounds were too narrow to reach AA either way (rare, very mid-tone +
  // high-chroma sources) — fall back to the full darken range.
  const fallback = pushToContrast(candidate, WHITE, AA_TEXT, 'darken', { minL: 0.06, maxL: 0.97 })
  return { fill: fallback, onFill: WHITE }
}

export interface PrefectureTokens {
  // brand identity — decorative use only (logo marks, illustration accents,
  // large graphics). Do NOT assume it is legible as text or a button fill.
  identity: string

  // solid, contrast-checked button/accent fill derived from `identity`.
  primary: string
  // text/icon color to place on top of `primary` (always >=4.5:1).
  onPrimary: string

  // saturated-but-legible variant of the identity color, guaranteed >=4.5:1
  // against the mode's surface — safe for links, icon-only accents, small text.
  primaryStrong: string

  // low-opacity identity tint, safe as a background wash (badges, hover, selected row).
  tintBg: string
  // border/divider tint derived from identity.
  tintBorder: string

  // neutral surface & text scale for the page in this mode.
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  border: string
}

export interface PrefectureThemePair {
  light: PrefectureTokens
  dark: PrefectureTokens
}

function mix(a: Oklch, b: Oklch, t: number): Oklch {
  return clampChroma(
    {
      mode: 'oklch',
      l: a.l + (b.l - a.l) * t,
      c: a.c + (b.c - a.c) * t,
      h: (a.h ?? 0) + ((b.h ?? 0) - (a.h ?? 0)) * t,
    },
    'oklch',
  )
}

function buildMode(identityHex: string, mode: 'light' | 'dark'): PrefectureTokens {
  const src = toOklch(identityHex)
  if (!src) throw new Error(`invalid color: ${identityHex}`)
  const h = src.h ?? 0
  // vivid: same lightness/hue as the sourced identity, but never fully washed out.
  const vivid = clampChroma({ ...src, c: Math.max(src.c, MIN_BRAND_CHROMA) }, 'oklch')

  const isLight = mode === 'light'
  const surfaceOk = oklch(isLight ? 0.985 : 0.15, 0.008, h)
  const surfaceAltOk = oklch(isLight ? 0.96 : 0.205, 0.014, h)
  const textOk = oklch(isLight ? 0.19 : 0.955, 0.02, h)
  const textMutedOk = oklch(isLight ? 0.44 : 0.72, 0.02, h)

  const surface = hex(surfaceOk)
  const text = hex(textOk)

  // border: a non-text UI boundary — still held to the 3:1 non-text minimum
  // against surface so component outlines stay perceivable.
  let borderOk = oklch(isLight ? 0.87 : 0.33, 0.03, h)
  borderOk = pushToContrast(borderOk, surface, AA_UI, isLight ? 'darken' : 'lighten', {
    minL: 0.15,
    maxL: 0.92,
  })

  // primary: a solid fill, legible enough to host body-sized on-color text.
  // Individuality matters here: instead of clamping every prefecture into the
  // same narrow mid-tone band (which flattens a near-black castle color and a
  // pale rapeseed yellow into the same "weight"), we stay as close as
  // possible to the identity's own lightness and only push it the minimum
  // distance needed to (a) legibly host white OR black text and (b) stay
  // visually separated from the mode's surface. Some prefectures end up
  // white-on-dark, others black-on-light — both are valid and that variety
  // is the point.
  const bounds = isLight ? { min: 0.16, max: 0.82 } : { min: 0.32, max: 0.92 }
  const primaryResult = resolveFace(vivid, bounds)
  const primaryOk = primaryResult.fill
  const onPrimary = primaryResult.onFill
  const primary = hex(primaryOk)

  // primaryStrong: identity-colored text/icon token, pushed to meet AA against surface.
  let strongOk = { ...vivid }
  const needsDarken = isLight
  strongOk = pushToContrast(strongOk, surface, AA_TEXT, needsDarken ? 'darken' : 'lighten', {
    minL: 0.1,
    maxL: 0.94,
  })
  const primaryStrong = hex(strongOk)

  // tintBg: identity mixed lightly into the surface — decorative wash, not text-bearing.
  const tintBgOk = mix(surfaceOk, vivid, isLight ? 0.12 : 0.18)
  const tintBg = hex(tintBgOk)

  // tintBorder: a step stronger than tintBg, meets the 3:1 non-text UI minimum against surface.
  let tintBorderOk = mix(surfaceOk, vivid, isLight ? 0.38 : 0.42)
  tintBorderOk = pushToContrast(tintBorderOk, surface, AA_UI, isLight ? 'darken' : 'lighten', {
    minL: 0.15,
    maxL: 0.92,
  })
  const tintBorder = hex(tintBorderOk)

  return {
    identity: identityHex,
    primary,
    onPrimary,
    primaryStrong,
    tintBg,
    tintBorder,
    surface,
    surfaceAlt: hex(surfaceAltOk),
    text,
    textMuted: hex(textMutedOk),
    border: hex(borderOk),
  }
}

export function buildPrefectureTheme(identityHex: string): PrefectureThemePair {
  return {
    light: buildMode(identityHex, 'light'),
    dark: buildMode(identityHex, 'dark'),
  }
}

export interface ContrastCheck {
  pair: string
  ratio: number
  min: number
  pass: boolean
}

export function auditTheme(id: string, theme: PrefectureThemePair): ContrastCheck[] {
  const checks: ContrastCheck[] = []
  const push = (mode: 'light' | 'dark', pair: string, fg: string, bg: string, min: number) => {
    const ratio = wcagContrast(fg, bg)
    checks.push({ pair: `${id}/${mode}/${pair}`, ratio: Math.round(ratio * 100) / 100, min, pass: ratio >= min })
  }
  for (const mode of ['light', 'dark'] as const) {
    const t = theme[mode]
    push(mode, 'text on surface', t.text, t.surface, AA_TEXT)
    push(mode, 'text on surfaceAlt', t.text, t.surfaceAlt, AA_TEXT)
    push(mode, 'textMuted on surface', t.textMuted, t.surface, AA_TEXT)
    push(mode, 'onPrimary on primary', t.onPrimary, t.primary, AA_TEXT)
    push(mode, 'primaryStrong on surface', t.primaryStrong, t.surface, AA_TEXT)
    push(mode, 'border on surface (UI)', t.border, t.surface, AA_UI)
    push(mode, 'tintBorder on surface (UI)', t.tintBorder, t.surface, AA_UI)
  }
  return checks
}
