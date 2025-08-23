/** biome-ignore-all lint/style/noMagicNumbers: storybook */
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from '@workspace/design-system/components/ui/aspect-ratio';

/**
 * Displays content within a desired ratio.
 */
const meta: Meta<typeof AspectRatio> = {
  title: 'ui/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  decorators: [
    (StoryComponent) => (
      <div className="w-1/2">
        <StoryComponent />
      </div>
    ),
  ],
  render: (args) => (
    <AspectRatio {...args} className="bg-slate-50 dark:bg-slate-800">
      {/** biome-ignore lint/performance/noImgElement: storybook */}
      <img
        alt="Alvaro Pinot"
        className="h-full w-full rounded-md object-cover"
        height="1200"
        src="https://images.unsplash.com/photo-1710104434410-9d56414deade?w=800&dpr=2&q=80"
        width="1600"
      />
    </AspectRatio>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the aspect ratio.
 */
export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
};

/**
 * Use the `1:1` aspect ratio to display a square image.
 */
export const Square: Story = {
  args: {
    ratio: 1,
  },
};

/**
 * Use the `4:3` aspect ratio to display a landscape image.
 */
export const Landscape: Story = {
  args: {
    ratio: 4 / 3,
  },
};

/**
 * Use the `2.35:1` aspect ratio to display a cinemascope image.
 */
export const Cinemascope: Story = {
  args: {
    ratio: 2.35 / 1,
  },
};
