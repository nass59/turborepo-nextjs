import type { Meta, StoryObj } from "@storybook/react"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@shared/ui"

const meta = {
  title: "Organisms/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    defaultOpen: {
      description:
        "The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    open: {
      description:
        "The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
      control: "boolean",
    },
    modal: {
      description:
        "The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
      table: {
        category: "Radix",
        type: { summary: "boolean" },
        defaultValue: { summary: true },
      },
      control: "boolean",
    },
    dir: {
      description:
        "The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.",
      table: {
        category: "Radix",
        type: { summary: "ltr|rtl" },
        defaultValue: { summary: "ltr" },
      },
      control: "select",
      options: ["ltr", "rtl"],
    },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
