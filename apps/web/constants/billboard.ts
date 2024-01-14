export const BILLBOARD_LABELS = {
  resource: "billboards",
  list: {
    resource: "billboards",
    title: "Billboards",
    description: "Manage billboards for your space",
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
    description: "API calls for Billboards",
    resourceId: "billboardId",
  },
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
  create: {
    title: "Create billboard",
    description: "Add a new billboard",
  },
  edit: {
    title: "Edit billboard",
    description: "Edit a billboard",
  },
} as const
