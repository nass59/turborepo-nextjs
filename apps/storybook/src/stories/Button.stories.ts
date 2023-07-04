import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@shared/ui"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ghost", "outline", "brand"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "My button",
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

export const Ghost: Story = {
  args: {
    ...Primary.args,
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    ...Primary.args,
    variant: "link",
  },
}

export const Brand: Story = {
  args: {
    ...Primary.args,
    variant: "brand",
  },
}

export const Large: Story = {
  args: {
    ...Primary.args,
    size: "lg",
  },
}

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "sm",
  },
}

export const Icon: Story = {
  args: {
    ...Primary.args,
    size: "icon",
    children: "x",
  },
}
