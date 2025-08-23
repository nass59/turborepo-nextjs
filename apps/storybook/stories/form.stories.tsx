import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@workspace/design-system/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/design-system/components/ui/form';
import { Input } from '@workspace/design-system/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  type infer as zInfer,
  object as zObject,
  string as zString,
} from 'zod';

/**
 * Building forms with React Hook Form and Zod.
 */
const meta: Meta<typeof Form> = {
  title: 'ui/Form',
  component: Form,
  tags: ['autodocs'],
  render: (args) => <ProfileForm {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

const formSchema = zObject({
  username: zString().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const ProfileForm = (args: Story['args']) => {
  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  // const onSubmit = (values: zInfer<typeof formSchema>) => {
  //   action("onSubmit")(values);
  // };

  return (
    <Form {...args} {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

/**
 * The default form of the form.
 */
export const Default: Story = {};
