import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'お名前' },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: '山田 太郎' } }
export const WithHelperText: Story = {
  args: { helperText: '本名でご記入ください。', placeholder: '山田 太郎' },
}
export const Required: Story = {
  args: { required: true, errorText: '必須項目です。', defaultValue: '' },
}
export const Disabled: Story = { args: { disabled: true, defaultValue: '山田 太郎' } }
