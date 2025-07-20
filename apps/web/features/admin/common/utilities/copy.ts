import { toast } from "@workspace/ui"

export const onCopy = (copyValue: string, toastMessage: string) => {
  navigator.clipboard.writeText(copyValue)
  toast({ title: toastMessage })
}
