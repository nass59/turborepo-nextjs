import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@workspace/design-system/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/design-system/components/ui/radio-group";

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of
 * the buttons can be checked at a time.
 */
const meta = {
  title: "ui/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    defaultValue: "comfortable",
    className: "grid gap-2 grid-cols-[1rem_1fr] items-center",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="default" id="r1" />
      <Label htmlFor="r1">Default</Label>
      <RadioGroupItem value="comfortable" id="r2" />
      <Label htmlFor="r2">Comfortable</Label>
      <RadioGroupItem value="compact" id="r3" />
      <Label htmlFor="r3">Compact</Label>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the radio group.
 */
export const Default: Story = {};
