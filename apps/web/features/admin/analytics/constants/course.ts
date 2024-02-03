export const ANALYTICS_LABELS = {
  resource: "analytics",
  list: {
    resource: "analytics",
    title: "Analytics",
    description: "Manage analytics for your space",
    add: "Add new",
    columns: {
      name: {
        accessorKey: "name",
        header: "Name",
      },
      createdAt: {
        accessorKey: "createdAt",
        header: "Date",
      },
      actions: {
        label: "Actions",
        open: "Open menu",
        copy: "Copy Id",
        copied: "Analytic Id copied to the clipboard",
        update: "Update",
        delete: "Delete",
      },
    },
  },
  api: {
    title: "API",
    description: "API calls for Analytics",
    resourceId: "analyticId",
  },
  form: {
    name: {
      name: "name",
      label: "Label",
      placeholder: "Analytic name",
    },
  },
  create: {
    title: "Create analytic",
    description: "Add a new analytic",
  },
  edit: {
    title: "Edit the analytic",
    description: "Edit a analytic",
  },
} as const
