import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/design-system/components/ui/avatar";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "ui/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the avatar.
 */
export const Default: Story = {};
