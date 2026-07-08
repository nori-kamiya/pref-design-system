import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
}
export default meta

type Story = StoryObj<typeof Alert>

export const Success: Story = { args: { status: 'success', title: '申し込みが完了しました。' } }
export const Warning: Story = {
  args: { status: 'warning', title: '在庫が残りわずかです。', children: 'お早めにお申し込みください。' },
}
export const Danger: Story = { args: { status: 'danger', title: '入力内容にエラーがあります。' } }
export const Info: Story = { args: { status: 'info', title: 'メンテナンスのお知らせ', children: '本日24時よりメンテナンスを実施します。' } }

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert status="success" title="申し込みが完了しました。" />
      <Alert status="warning" title="在庫が残りわずかです。" />
      <Alert status="danger" title="入力内容にエラーがあります。" />
      <Alert status="info" title="メンテナンスのお知らせ" />
    </div>
  ),
}
