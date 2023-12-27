import type { Meta, StoryObj } from "@storybook/react"

import { Avatar, AvatarImage, AvatarStyle } from "@shared/ui"

type AvatarSizes = keyof typeof AvatarStyle.sizes
const sizes = Object.keys(AvatarStyle.sizes) as AvatarSizes[]

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      description: "Defines the size of the avatar",
      table: {
        type: { summary: sizes.join("|") },
        defaultValue: { summary: "md" },
      },
      control: "select",
      options: sizes,
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
    asChild: {
      description:
        "Radix will not render a default DOM element, instead cloning the part's child and passing it the props",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
  },
  render: ({ ...args }) => {
    return (
      <Avatar size={args.size}>
        <AvatarImage
          src="https://xsgames.co/randomusers/avatar.php?g=female"
          alt="Picture of the author"
        />
      </Avatar>
    )
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const Medium: Story = {
  args: {
    size: "md",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const All: Story = {
  render: () => {
    return (
      <div className="mb-4 flex items-center space-x-2">
        {sizes.map((size) => (
          <Avatar size={size} key={size}>
            <AvatarImage
              src="https://xsgames.co/randomusers/avatar.php?g=female"
              alt="Picture of the author"
            />
          </Avatar>
        ))}
      </div>
    )
  },
}
