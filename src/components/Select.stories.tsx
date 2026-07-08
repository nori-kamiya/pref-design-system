import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'お届け方法' },
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <option>通常配送</option>
      <option>お急ぎ便</option>
      <option>店舗受け取り</option>
    </Select>
  ),
}

export const WithHelperText: Story = {
  args: { helperText: '地域により選べない方法があります。' },
  render: (args) => (
    <Select {...args}>
      <option>通常配送</option>
      <option>お急ぎ便</option>
    </Select>
  ),
}
