import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <h3 className="mb-2 text-base font-semibold text-pref-text">名産品情報</h3>
      <p className="mb-4 text-sm text-pref-text-muted">
        この地域を象徴するカラーパレットを使ったカードコンポーネントです。
      </p>
      <Button size="sm">詳しく見る</Button>
    </Card>
  ),
}

export const Tinted: Story = {
  render: () => (
    <Card tinted>
      <Badge>おすすめ</Badge>
      <h3 className="mt-2 mb-1 text-base font-semibold text-pref-text">観光スポット</h3>
      <p className="text-sm text-pref-text-muted">tintBg を背景に使った控えめな強調カード。</p>
    </Card>
  ),
}
