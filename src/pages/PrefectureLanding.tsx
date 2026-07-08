import { usePrefecture } from '../components/PrefectureProvider'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { Avatar } from '../components/Avatar'
import { Alert } from '../components/Alert'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Switch } from '../components/Switch'
import { Tabs } from '../components/Tabs'
import { Tooltip } from '../components/Tooltip'
import { heroCopy, spotContent, testimonial } from './landingContent'
import type { Prefecture } from '../tokens/generated'

function Header() {
  const { prefecture, setPrefectureId, mode, setMode, prefectures } = usePrefecture()

  return (
    <header className="sticky top-0 z-10 border-b border-pref-border bg-pref-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <p className="text-sm font-bold tracking-wide text-pref-text">47 PREFECTURES TRIP</p>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            label="都道府県"
            value={prefecture.id}
            onChange={(e) => setPrefectureId(e.target.value)}
            className="h-9 py-0 text-sm"
          >
            {prefectures.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nameJa}
              </option>
            ))}
          </Select>
          <Select
            label="モード"
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            className="h-9 py-0 text-sm"
          >
            <option value="system">system</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </Select>
        </div>
      </div>
    </header>
  )
}

function QuickJump({ prefectures, activeId, onJump }: { prefectures: Prefecture[]; activeId: string; onJump: (id: string) => void }) {
  return (
    <nav aria-label="都道府県クイックジャンプ" className="border-b border-pref-border bg-pref-surface-alt">
      <ul className="mx-auto flex max-w-5xl list-none gap-2 overflow-x-auto px-6 py-3">
        {prefectures.map((p) => (
          <li key={p.id} className="shrink-0">
            <Tooltip label={p.nameJa}>
              <button
                type="button"
                aria-label={p.nameJa}
                aria-pressed={p.id === activeId}
                onClick={() => onJump(p.id)}
                className={`size-6 rounded-full transition-transform hover:scale-110
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pref-primary-strong
                  ${p.id === activeId ? 'ring-2 ring-pref-primary-strong ring-offset-2 ring-offset-pref-surface-alt' : ''}`}
                style={{ background: p.light.primary }}
              />
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Hero({ prefecture }: { prefecture: Prefecture }) {
  const copy = heroCopy(prefecture)
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <p className="text-sm font-semibold tracking-wide text-pref-primary-strong">{copy.eyebrow}</p>
      <h1 className="mt-2 text-4xl font-bold text-pref-text sm:text-5xl">{copy.headline}</h1>
      <p className="mt-4 max-w-2xl text-base text-pref-text-muted">{copy.lede}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button size="md">旅行プランを見る</Button>
        <Button variant="strong" size="md">
          詳しく見る
        </Button>
        <Badge>{prefecture.region}</Badge>
        <Badge>identity {prefecture.hex}</Badge>
      </div>
    </section>
  )
}

function InfoTabs({ prefecture }: { prefecture: Prefecture }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <Tabs
        items={[
          {
            id: 'overview',
            label: '概要',
            content: (
              <p className="text-sm text-pref-text-muted">
                {prefecture.nameJa}は{prefecture.region}に位置し、識別色は{prefecture.rationale}に由来します。
              </p>
            ),
          },
          {
            id: 'access',
            label: 'アクセス',
            content: (
              <p className="text-sm text-pref-text-muted">
                主要駅・空港からのアクセス情報をここに掲載します（デモ用ダミーテキスト）。
              </p>
            ),
          },
          {
            id: 'gourmet',
            label: 'グルメ',
            content: (
              <p className="text-sm text-pref-text-muted">
                名産品を使った郷土料理や、地元で人気の飲食店を紹介します（デモ用ダミーテキスト）。
              </p>
            ),
          },
        ]}
        defaultTabId="overview"
      />
    </section>
  )
}

function SpotCards({ prefecture }: { prefecture: Prefecture }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <h2 className="mb-4 text-lg font-bold text-pref-text">おすすめ情報</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {spotContent(prefecture).map((spot) => (
          <Card key={spot.title} tinted>
            <Badge>{spot.tag}</Badge>
            <h3 className="mt-2 mb-1 text-base font-semibold text-pref-text">{spot.title}</h3>
            <p className="mb-3 text-sm text-pref-text-muted">{spot.desc}</p>
            <Button variant="ghost" size="sm">
              詳しく見る
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

function AnnouncementAndTestimonial() {
  return (
    <section className="mx-auto grid max-w-5xl gap-4 px-6 py-8 sm:grid-cols-2">
      <Alert status="info" title="お知らせ">
        この地域の観光キャンペーンは今月末まで開催中です。
      </Alert>
      <Card>
        <div className="flex items-start gap-3">
          <Avatar name={testimonial.name} />
          <div>
            <p className="text-sm text-pref-text">“{testimonial.quote}”</p>
            <p className="mt-2 text-xs text-pref-text-muted">
              {testimonial.name} / {testimonial.role}
            </p>
          </div>
        </div>
      </Card>
    </section>
  )
}

function InquiryForm() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <Card>
        <h2 className="mb-4 text-lg font-bold text-pref-text">旅行プランのお問い合わせ</h2>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input label="お名前" placeholder="山田 太郎" required />
          <Input label="メールアドレス" type="email" placeholder="you@example.com" required />
          <Select label="ご興味のある分野" className="sm:col-span-2">
            <option>観光スポット</option>
            <option>グルメ</option>
            <option>宿泊</option>
          </Select>
          <div className="sm:col-span-2">
            <Switch label="お得な情報をメールで受け取る" defaultChecked />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">送信する</Button>
          </div>
        </form>
      </Card>
    </section>
  )
}

function Footer({ prefecture }: { prefecture: Prefecture }) {
  return (
    <footer className="border-t border-pref-border py-8">
      <p className="mx-auto max-w-5xl px-6 text-xs text-pref-text-muted">
        © 47 Prefectures Trip — 現在表示中: {prefecture.nameJa}
      </p>
    </footer>
  )
}

export function PrefectureLanding() {
  const { prefecture, setPrefectureId, prefectures } = usePrefecture()

  return (
    <div className="min-h-screen bg-pref-surface">
      <Header />
      <QuickJump prefectures={prefectures} activeId={prefecture.id} onJump={setPrefectureId} />
      <Hero prefecture={prefecture} />
      <InfoTabs prefecture={prefecture} />
      <SpotCards prefecture={prefecture} />
      <AnnouncementAndTestimonial />
      <InquiryForm />
      <Footer prefecture={prefecture} />
    </div>
  )
}
