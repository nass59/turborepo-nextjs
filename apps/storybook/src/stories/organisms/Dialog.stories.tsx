import type { Meta, StoryObj } from "@storybook/react"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui"

const meta = {
  title: "Organisms/Dialog",
  component: Dialog,
  argTypes: {
    defaultOpen: {
      description:
        "The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    open: {
      description:
        "The controlled open state of the dialog. Must be used in conjunction with onOpenChange.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    modal: {
      description:
        "The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
      control: "boolean",
    },
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the Dialog",
      table: {
        defaultValue: { summary: null },
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button>Open the Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptas, voluptatum quas, voluptatibus, quidem quia quibusdam
            voluptate consequatur quod aperiam.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
