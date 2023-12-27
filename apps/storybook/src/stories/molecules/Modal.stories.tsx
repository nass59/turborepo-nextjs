import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Button, Modal } from "@shared/ui"

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  argTypes: {
    title: {
      description: "The title of the modal.",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      description: "The description of the modal.",
      table: {
        type: { summary: "string" },
      },
    },
    isOpen: {
      description: "The controlled open state of the modal.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    onClose: {
      description: "Callback for when the modal is closed.",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Modal Title",
    description: "Modal description",
    isOpen: false,
    onClose: () => {},
  },
  render: ({ ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
      <div>
        <Button onClick={() => setIsOpen(!isOpen)}>Open the Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Hello World
        </Modal>
      </div>
    )
  },
}
