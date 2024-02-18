import type { Meta, StoryObj } from "@storybook/react"

import { Button, Toast, Toaster, ToastStyle, useToast } from "@shared/ui"

type ToastVariants = keyof typeof ToastStyle.variants
const variants = Object.keys(ToastStyle.variants) as ToastVariants[]

const meta = {
  title: "Organisms/Toast",
  component: Toast,
  argTypes: {
    variant: {
      description: "Defines the variant of the toast",
      table: {
        type: { summary: variants.join("|") },
        defaultValue: { summary: "default" },
      },
      control: "select",
      options: variants,
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ ...args }) => {
    const { toast } = useToast()

    return (
      <div className="h-96">
        <Toaster />
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up ",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: args.variant,
            })
          }}
        >
          Add to calendar
        </Button>
      </div>
    )
  },
}
