import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: '特産品' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>特産品</Badge>
      <Badge>名所</Badge>
      <Badge>伝統色</Badge>
    </div>
  ),
}
