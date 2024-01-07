import { Pencil1Icon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"

import { Button, Heading, HeadingAction } from "@shared/ui"

const meta = {
  title: "Molecules/Heading",
  component: Heading,
  argTypes: {
    title: {
      description: "Title of the Heading",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    description: {
      description: "Description of the Heading",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    className: {
      description: "Override or extend the styles applied to the component",
      control: "text",
      table: {
        category: "Override/extend",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the Heading",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: null },
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Documentation",
    description: " Welcome to the TechShip documentation.",
  },
  render: ({ ...args }) => {
    return (
      <Heading {...args}>
        <HeadingAction>
          <Button size="icon">
            <Pencil1Icon />
          </Button>
        </HeadingAction>
      </Heading>
    )
  },
}
