import { type UseFormReturn } from "react-hook-form";

import { Button } from "@workspace/design-system/components/ui/button";
import {
  Form,
  // FormFooter,
} from "@workspace/design-system/components/ui/form";

type Props = {
  form: UseFormReturn<any>;
  initialData: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
  children: React.ReactNode;
};

export const FormContainer = ({
  form,
  initialData,
  onSubmit,
  loading,
  children,
}: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <div className="grid grid-cols-3 gap-8">{children}</div>

        <div>
          <Button disabled={loading} type="submit">
            {initialData ? "Save changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
