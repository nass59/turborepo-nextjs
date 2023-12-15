import type { Meta, StoryObj } from "@storybook/react"

import { Heading } from "@shared/ui"

const meta = {
  title: "UI/Heading",
  component: Heading,
  argTypes: {
    title: {
      description: "Defines the title of the heading",
      control: "text",
    },
    description: {
      description: "Defines the description of the heading",
      control: "text",
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Documentation",
    description: "Welcome to the TechShip documentation.",
  },
}
