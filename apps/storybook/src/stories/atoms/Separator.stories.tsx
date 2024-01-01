import type { Meta, StoryObj } from "@storybook/react"

import { Separator } from "@shared/ui"

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      description: "The orientation of the separator.",
      table: {
        category: "Radix",
        type: { summary: "horizontal|vertical" },
        defaultValue: { summary: "horizontal" },
      },
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      description:
        "When true, signifies that it is purely visual, carries no semantic meaning, and ensures it is not present in the accessibility tree.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
    },
    asChild: {
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior.",
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
  render: ({ ...args }) => {
    return (
      <div className="h-3">
        <Separator {...args} />
      </div>
    )
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
}

export const Demo: Story = {
  render: () => {
    return (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">
            An open-source UI component library.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    )
  },
}
