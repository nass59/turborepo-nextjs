import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/design-system/components/ui/alert-dialog";

import { toastError } from "@/lib/api-response/api-responses";

import { apiRoutes } from "../constants/routes";

type Props = {
  resource: string;
  resourceId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CellModal = ({ resource, resourceId, open, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  // TODO: Refactor using Server Actions
  const onDelete = async () => {
    try {
      setLoading(true);
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/${resource}`;
      await axios.delete(`${baseUrl}/${resourceId}`);
      router.refresh();
      toast("This resource has been successfully deleted");
    } catch (error) {
      toastError(error, "An error occurred while deleting the resource");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this resource?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            resource.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading && <Pencil className="mr-2 size-4 animate-spin" />}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
