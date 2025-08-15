import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";

import { Toaster } from "@workspace/design-system/components/ui/sonner";

/**
 * An opinionated toast component for React.
 */
const meta: Meta<typeof Toaster> = {
  title: "ui/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    position: "bottom-right",
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the toaster.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-96 items-center justify-center space-x-2">
      <button
        type="button"
        onClick={() =>
          toast("Event has been created", {
            description: new Date().toLocaleString(),
            action: {
              label: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        Show Toast
      </button>
      <Toaster {...args} />
    </div>
  ),
};
