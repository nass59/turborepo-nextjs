import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@shared/ui"

const meta = {
  title: "Organisms/Form",
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const form = useForm()
    const [value, setValue] = useState<string>("")

    return (
      <Form {...form}>
        <form onSubmit={() => null}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My name"
                    {...field}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  },
}
