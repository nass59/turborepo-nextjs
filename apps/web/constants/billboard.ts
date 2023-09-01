export const BILLBOARD_LABELS = {
  form: {
    imageUrl: {
      name: "imageUrl",
      label: "Background Image",
    },
    label: {
      name: "label",
      label: "Label",
      placeholder: "Billboard label",
    },
  },
  list: {
    title: "Billboards",
    desscription: "Manage billboards for your space",
    add: "Add new",
    columns: {
      label: {
        accessorKey: "label",
        header: "Label",
      },
      createdAt: {
        accessorKey: "createdAt",
        header: "Date",
      },
      actions: {
        label: "Actions",
        open: "Open menu",
        copy: "Copy Id",
        copied: "Billboard Id copied to the clipboard",
        update: "Update",
        delete: "Delete",
      },
    },
  },
  api: {
    title: "API",
    desscription: "API calls for Billboards",
    entityName: "billboards",
    entityIdName: "billboardId",
  },
  create: {
    title: "Create billboard",
    desscription: "Add a new billboard",
    toastMessage: "Billboard created.",
    action: "Create",
    error: "Your billboard was not created. Please try again.",
  },
  edit: {
    title: "Edit billboard",
    desscription: "Edit a billboard",
    toastMessage: "Billboard updated.",
    action: "Save changes",
    error: "Your billboard was not updated. Please try again.",
  },
  delete: {
    toastMessage: "Billboard deleted.",
    error: "Your billboard was not deleted. Please try again.",
  },
} as const
