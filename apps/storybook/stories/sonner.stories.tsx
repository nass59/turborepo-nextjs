import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from '@workspace/design-system/components/ui/sonner';
import { toast } from 'sonner';

/**
 * An opinionated toast component for React.
 */
const meta: Meta<typeof Toaster> = {
  title: 'ui/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    position: 'bottom-right',
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
        onClick={() =>
          toast('Event has been created', {
            description: new Date().toLocaleString(),
            action: {
              label: 'Undo',
              onClick: () => {
                alert('Undone');
              },
            },
          })
        }
        type="button"
      >
        Show Toast
      </button>
      <Toaster {...args} />
    </div>
  ),
};
