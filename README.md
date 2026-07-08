# 47 Prefectures Design System

A color-driven design system with one accessible light/dark palette per
Japanese prefecture (47 total), derived algorithmically from a single
"identity color" sourced from each prefecture's flag/symbol, a traditional
JAPAN COLOR dye name, or a well-known local specialty.

Swapping the active prefecture (`data-pref="..."` on `<html>`) re-themes an
entire app — buttons, text, tints, borders — while every generated token pair
stays WCAG AA compliant (4.5:1 text, 3:1 UI), verified by an automated
contrast audit across all 47 × light/dark combinations.

## Why

Using a prefecture's real-world color 1:1 is not safe: many source colors
(kanpyō beige, melon green, pearl, plaster white, charcoal...) are far too
low-contrast to use directly as text or button fills. This project treats
each source color as a *seed*, not a token, and derives a full accessible
palette from it in OKLCH color space.

## What's inside

- `src/lib/colorEngine.ts` — seed color → accessible token set (primary,
  onPrimary, primaryStrong, tints, neutrals), contrast-checked with a
  nearest-lightness search so each prefecture keeps its own tonal character
  instead of collapsing into one uniform "brand" weight.
- `src/tokens/prefectures.json` — the 47 seed colors with a one-line
  rationale for each (flag color / traditional color name / local specialty).
- `scripts/generate-tokens.ts` — generates `src/styles/tokens.css`,
  `src/tokens/generated.ts`, and a contrast audit report (`npm run tokens`).
- `src/components/` — Button, Card, Badge, Input, Select, Tabs, Switch,
  Tooltip, Alert, Avatar — all built on the token layer, with Storybook
  stories and a `PrefectureProvider` for switching prefecture/light/dark at
  runtime.
- `src/pages/PrefectureLanding.tsx` — a working mockup page that exercises
  every component together, with a 47-color quick-jump strip to browse all
  prefectures.

## Getting started

```sh
npm install
npm run tokens      # regenerate tokens + run the contrast audit
npm run dev         # mockup page at localhost:5173
npm run storybook   # component catalog + full-47 token overview
npm run build
```

## License

MIT — see [LICENSE](./LICENSE).

---

# 47都道府県デザインシステム(日本語)

47都道府県それぞれに、アクセシブルなlight/darkカラーパレットを1つずつ持つ
デザインシステムです。各県の「識別色」(県章・県旗、JAPAN COLOR(伝統色)、
名産品などから1色選定)を種として、OKLCH色空間でアルゴリズム的にセマンティ
ックトークンを導出しています。

`<html data-pref="...">` を切り替えるだけで、ボタン・文字色・背景の薄色・
境界線まで含めたアプリ全体が再配色されます。生成される全トークンは
WCAG AA(本文4.5:1、UI要素3:1)を満たすことを、47都道府県 × light/dark の
全組み合わせに対する自動コントラスト監査で検証しています。

## なぜこの設計か

県の色をそのまま使うのは危険です。栃木の「かんぴょう」のような薄いベージュ
や茨城の「メロン」の淡い緑など、彩度・明度によっては文字色やボタン背景に
直接使うと視認性が大きく損なわれます。このプロジェクトでは県の色を
「トークンそのもの」ではなく「種(シード)」として扱い、そこから安全な
パレット一式を導出します。

## 構成

- `src/lib/colorEngine.ts` — シード色からアクセシブルなトークン一式
  (primary, onPrimary, primaryStrong, tint, neutralなど)を導出。各県の
  明度をなるべく保持したまま最小限の調整でAA基準を満たすロジック。
- `src/tokens/prefectures.json` — 47都道府県分のシード色と選定根拠。
- `scripts/generate-tokens.ts` — トークンCSS・型定義・コントラスト監査を
  生成(`npm run tokens`)。
- `src/components/` — Button / Card / Badge / Input / Select / Tabs /
  Switch / Tooltip / Alert / Avatar。Storybookストーリー付き。
- `src/pages/PrefectureLanding.tsx` — 全コンポーネントを使った実働の
  モックアップページ。47色クイックジャンプバーで全県を確認可能。

## ライセンス

MIT — [LICENSE](./LICENSE) を参照してください。
