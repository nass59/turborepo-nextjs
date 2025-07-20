import { toast } from "@workspace/design-system/components/ui";

export const onCopy = (copyValue: string, toastMessage: string) => {
  navigator.clipboard.writeText(copyValue);
  toast({ title: toastMessage });
};
