import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { prefectures, type Prefecture } from '../tokens/generated'

export type ColorMode = 'light' | 'dark' | 'system'

interface PrefectureContextValue {
  prefecture: Prefecture
  setPrefectureId: (id: string) => void
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  prefectures: Prefecture[]
}

const PrefectureContext = createContext<PrefectureContextValue | null>(null)

export function usePrefecture(): PrefectureContextValue {
  const ctx = useContext(PrefectureContext)
  if (!ctx) throw new Error('usePrefecture must be used within a PrefectureProvider')
  return ctx
}

export function PrefectureProvider({
  children,
  defaultPrefectureId = 'tokyo',
  defaultMode = 'system',
}: {
  children: ReactNode
  defaultPrefectureId?: string
  defaultMode?: ColorMode
}) {
  const [prefectureId, setPrefectureId] = useState(defaultPrefectureId)
  const [mode, setMode] = useState<ColorMode>(defaultMode)

  const prefecture = useMemo(
    () => prefectures.find((p) => p.id === prefectureId) ?? prefectures[0],
    [prefectureId],
  )

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-pref', prefecture.id)
    if (mode === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', mode)
  }, [prefecture.id, mode])

  const value = useMemo(
    () => ({ prefecture, setPrefectureId, mode, setMode, prefectures }),
    [prefecture, mode],
  )

  return <PrefectureContext.Provider value={value}>{children}</PrefectureContext.Provider>
}
