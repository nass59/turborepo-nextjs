import { action } from "@storybook/addon-actions"
import type { Meta, StoryObj } from "@storybook/react"

import { MarketingHeader } from "@/components/marketing/marketing-header"

const meta: Meta<typeof MarketingHeader> = {
  title: "Example/Header",
  component: MarketingHeader,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["docsPage"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof MarketingHeader>

export const LoggedIn: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/blog",
        push(...args: any) {
          action("nextNavigation.push")(...args)
          return Promise.resolve(true)
        },
        prefetch(...args: any) {
          action("nextNavigation.prefetch")(...args)
          return Promise.resolve(true)
        },
      },
    },
  },
}
