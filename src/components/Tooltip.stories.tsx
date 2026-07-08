import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'
import { Button } from './Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <div className="p-12">
      <Tooltip label="この県の識別色を使ったボタンです">
        <Button variant="strong">申し込む</Button>
      </Tooltip>
    </div>
  ),
}
