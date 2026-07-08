import type { Meta, StoryObj } from '@storybook/react-vite'
import { prefectures } from '../tokens/generated'
import { ColorSwatch } from '../components/ColorSwatch'
import auditReport from '../tokens/audit.json'

const meta: Meta = {
  title: 'Foundations/Prefectures Overview',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

export const AllPrefectures: Story = {
  render: () => (
    <div className="p-6">
      <p className="mb-4 text-sm text-pref-text-muted">
        全 47 都道府県 × light/dark の識別色（identity）・ボタン色（primary）・本文で使える濃色
        （primaryStrong）。WCAG コントラスト監査:{' '}
        <strong>
          {auditReport.total - auditReport.failures}/{auditReport.total}
        </strong>{' '}
        checks passed.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {prefectures.map((p) => (
          <ColorSwatch key={p.id} prefecture={p} mode="light" />
        ))}
      </div>
    </div>
  ),
}

export const AllPrefecturesDark: Story = {
  render: () => (
    <div className="bg-[#0b0b0d] p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {prefectures.map((p) => (
          <ColorSwatch key={p.id} prefecture={p} mode="dark" />
        ))}
      </div>
    </div>
  ),
}
