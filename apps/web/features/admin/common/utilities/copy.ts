import { toast } from "@shared/ui"

export const onCopy = (copyValue: string, toastMessage: string) => {
  navigator.clipboard.writeText(copyValue)
  toast({ title: toastMessage })
}
