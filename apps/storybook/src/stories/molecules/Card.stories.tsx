import type { Meta, StoryObj } from "@storybook/react"

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardStyle,
  CardTitle,
} from "@shared/ui"

type CardVariants = keyof typeof CardStyle.variants
const variants = Object.keys(CardStyle.variants) as CardVariants[]

const meta = {
  title: "Molecules/Card",
  component: Card,
  argTypes: {
    variant: {
      description: "Defines the variant of the card",
      table: {
        type: { summary: variants.join("|") },
        defaultValue: { summary: "default" },
      },
      control: "select",
      options: variants,
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
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: ({ ...args }) => {
    return (
      <div className="flex max-h-[280px] max-w-[280px]">
        <Card variant={args.variant}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptas, voluptatum quas, voluptatibus, quidem quia quibusdam
              voluptate consequatur quod aperiam.
            </CardDescription>
          </CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </div>
    )
  },
}

export const Poster: Story = {
  args: {
    variant: "poster",
  },
  render: ({ ...args }) => {
    return (
      <div className="flex max-h-[280px] max-w-[280px]">
        <Card variant={args.variant}>
          <CardHeader isAbsolute>
            <Badge>Tag</Badge>
          </CardHeader>
          <CardContent isPoster>
            <img
              src="https://xl.movieposterdb.com/15_06/2015/1392190/xl_1392190_28b2ecfb.jpg"
              alt=""
              className="rounded-sm object-cover"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}
