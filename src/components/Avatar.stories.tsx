import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: '山田太郎' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="山田太郎" size="sm" />
      <Avatar name="山田太郎" size="md" />
      <Avatar name="山田太郎" size="lg" />
    </div>
  ),
}
