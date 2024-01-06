import { Pencil1Icon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"

import {
  Button,
  Heading,
  HeadingAction,
  HeadingDescription,
  HeadingTitle,
} from "@shared/ui"

const meta = {
  title: "Molecules/Heading",
  component: Heading,
  argTypes: {
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
  render: () => {
    return (
      <Heading>
        <HeadingTitle>Documentation</HeadingTitle>
        <HeadingDescription>
          Welcome to the TechShip documentation.
        </HeadingDescription>
        <HeadingAction>
          <Button size="icon">
            <Pencil1Icon />
          </Button>
        </HeadingAction>
      </Heading>
    )
  },
}
