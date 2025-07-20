import type { Meta, StoryObj } from "@storybook/react";
import { BellRing } from "lucide-react";

import { Button } from "@workspace/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/ui/card";

const notifications = [
  {
    id: 1,
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    id: 2,
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    id: 3,
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

/**
 * Displays a card with header, content, and footer.
 */
const meta = {
  title: "ui/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-96",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-center gap-4">
            <BellRing className="size-5" />
            <div>
              <p>{notification.title}</p>
              <p className="text-foreground/50">{notification.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="default">Close</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the card.
 */
export const Default: Story = {};
