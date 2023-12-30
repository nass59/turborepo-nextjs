import type { Meta, StoryObj } from "@storybook/react"

import { Button, Popover, PopoverContent, PopoverTrigger } from "@shared/ui"

const meta = {
  title: "Molecules/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open the Popover</Button>
        </PopoverTrigger>
        <PopoverContent align="center" sideOffset={6} side="right">
          <p className="text-sm">Place content for the popover here.</p>
        </PopoverContent>
      </Popover>
    )
  },
}
