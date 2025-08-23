import { toast } from 'sonner';

export const onCopy = (copyValue: string, toastMessage: string) => {
  navigator.clipboard.writeText(copyValue);
  toast(toastMessage);
};
