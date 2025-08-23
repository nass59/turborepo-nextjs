import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@workspace/design-system/components/ui/carousel';

const items = [
  { id: 1, title: 'First slide' },
  { id: 2, title: 'Second slide' },
  { id: 3, title: 'Third slide' },
  { id: 4, title: 'Fourth slide' },
  { id: 5, title: 'Fifth slide' },
];

/**
 * A carousel with motion and swipe built using Embla.
 */
const meta: Meta<typeof Carousel> = {
  title: 'ui/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'w-full max-w-xs',
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {items.map(({ id }) => (
          <CarouselItem key={id}>
            <div className="flex aspect-square items-center justify-center rounded border bg-card p-6">
              <span className="font-semibold text-4xl">{id}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the carousel.
 */
export const Default: Story = {};

/**
 * Use the `basis` utility class to change the size of the carousel.
 */
export const Size: Story = {
  args: {
    className: 'mx-12 w-full max-w-xs',
  },
  render: (args) => (
    <Carousel {...args} className="mx-12 w-full max-w-xs">
      <CarouselContent>
        {items.map(({ id }) => (
          <CarouselItem className="basis-1/3" key={id}>
            <div className="flex aspect-square items-center justify-center rounded border bg-card p-6">
              <span className="font-semibold text-4xl">{id}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
