import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    items: [
      { id: 'overview', label: '概要', content: <p className="text-sm text-pref-text">この地域の概要です。</p> },
      { id: 'access', label: 'アクセス', content: <p className="text-sm text-pref-text">アクセス情報です。</p> },
      { id: 'gourmet', label: 'グルメ', content: <p className="text-sm text-pref-text">名産品情報です。</p> },
    ],
  },
}
