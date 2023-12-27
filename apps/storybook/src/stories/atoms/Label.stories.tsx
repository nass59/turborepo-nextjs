import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "@shared/ui"

const meta = {
  title: "Atoms/Label",
  component: Label,
  argTypes: {
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the badge",
      table: {
        defaultValue: { summary: null },
      },
    },
    asChild: {
      description:
        "Radix will not render a default DOM element, instead cloning the part's child and passing it the props",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
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
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "My label",
  },
}
