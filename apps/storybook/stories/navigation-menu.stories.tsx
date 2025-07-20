import type { Meta, StoryObj } from "@storybook/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/design-system/components/ui/navigation-menu";

const navigationLinkStyle = navigationMenuTriggerStyle();

/**
 * A collection of links for navigating websites.
 */
const meta = {
  title: "ui/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://www.google.com"
            className={navigationLinkStyle}
          >
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationLinkStyle}>
              Documentation
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-96 p-2">
                <li>
                  <NavigationMenuLink className={navigationLinkStyle}>
                    API Reference
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className={navigationLinkStyle}>
                    Getting Started
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink className={navigationLinkStyle}>
                    Guides
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationLinkStyle}
            href="https://www.google.com"
            target="_blank"
          >
            External
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the navigation menu.
 */
export const Default: Story = {};
