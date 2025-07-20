import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@workspace/design-system/components/ui/checkbox";
import { Label } from "@workspace/design-system/components/ui/label";

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "ui/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    id: "terms",
    disabled: false,
  },
  render: (args) => (
    <div className="flex space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id}>Accept terms and conditions</Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the checkbox.
 */
export const Default: Story = {};

/**
 * Use the `disabled` prop to disable the checkbox.
 */
export const Disabled: Story = {
  args: {
    id: "disabled-terms",
    disabled: true,
  },
};
