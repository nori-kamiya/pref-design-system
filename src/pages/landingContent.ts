import type { Prefecture } from '../tokens/generated'

export interface SpotContent {
  tag: string
  title: string
  desc: string
}

export function heroCopy(p: Prefecture) {
  return {
    eyebrow: `${p.region} ・ ${p.nameEn}`,
    headline: `${p.nameJa}の旅へ`,
    lede: `この地域のブランドカラーは、${p.rationale}。旅先ごとの色を通して、47都道府県それぞれの個性を伝えるデザインシステムです。`,
  }
}

export function spotContent(p: Prefecture): SpotContent[] {
  return [
    {
      tag: '観光',
      title: `${p.nameJa}の定番スポット`,
      desc: `地域を代表する景観を巡る、王道の観光コース。identity カラーの由来になった場所も訪れられます。`,
    },
    {
      tag: 'グルメ',
      title: '地元グルメ',
      desc: 'ブランドカラーの由来にもなった名産品を、地元の名店で味わえます。',
    },
    {
      tag: '宿泊',
      title: '落ち着いた宿',
      desc: '旅の疲れを癒す、静かな時間を過ごせる宿泊施設をセレクト。',
    },
  ]
}

export const testimonial = {
  name: '佐藤 花子',
  role: '地域アンバサダー',
  quote: 'この土地らしい色で紹介されると、訪れる前から旅の気分が高まります。',
}
