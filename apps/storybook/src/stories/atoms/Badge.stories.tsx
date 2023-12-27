import type { Meta, StoryObj } from "@storybook/react"

import { Badge, BadgeStyle } from "@shared/ui"

type BadgeVariants = keyof typeof BadgeStyle.variants
const variants = Object.keys(BadgeStyle.variants) as BadgeVariants[]

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    variant: {
      description: "Defines the variant of the badge",
      table: {
        type: { summary: variants.join("|") },
        defaultValue: { summary: "default" },
      },
      control: "select",
      options: variants,
    },
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the badge",
      table: {
        defaultValue: { summary: null },
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
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "default",
    children: "My badge",
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    ...Primary.args,
    variant: "destructive",
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: "outline",
  },
}

export const All: Story = {
  render: () => {
    return (
      <>
        {variants.map((variant) => (
          <div className="flex items-baseline space-y-2" key={variant}>
            <div className="w-[100px] text-sm text-slate-500">{variant}</div>
            <Badge variant={variant} key={variant}>
              Badge
            </Badge>
          </div>
        ))}
      </>
    )
  },
}
