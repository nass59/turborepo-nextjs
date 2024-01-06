import { RocketIcon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"

import { Alert, AlertDescription, AlertStyle, AlertTitle } from "@shared/ui"

type AlertVariants = keyof typeof AlertStyle.variants

const variants = Object.keys(AlertStyle.variants) as AlertVariants[]

const meta = {
  title: "Molecules/Alert",
  component: Alert,
  argTypes: {
    variant: {
      description: "Defines the variant of the alert",
      table: {
        type: { summary: variants.join("|") },
        defaultValue: { summary: "default" },
      },
      control: "select",
      options: variants,
    },
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the Heading",
      table: {
        defaultValue: { summary: null },
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Alert {...args}>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    )
  },
}
