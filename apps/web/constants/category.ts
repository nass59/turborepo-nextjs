export const CATEGORY_LABELS = {
  resource: "categories",
  list: {
    resource: "categories",
    title: "Categories",
    description: "Manage categories for your space",
    add: "Add new",
    columns: {
      name: {
        accessorKey: "name",
        header: "Name",
      },
      billboard: {
        accessorKey: "billboardLabel",
        header: "Billboard",
      },
      createdAt: {
        accessorKey: "createdAt",
        header: "Date",
      },
      actions: {
        label: "Actions",
        open: "Open menu",
        copy: "Copy Id",
        copied: "Category Id copied to the clipboard",
        update: "Update",
        delete: "Delete",
      },
    },
  },
  api: {
    title: "API",
    description: "API calls for Categories",
    resourceId: "categoryId",
  },
  form: {
    name: {
      name: "name",
      label: "Label",
      placeholder: "Category name",
    },
    billboardId: {
      name: "billboardId",
      label: "Billboard",
      placeholder: "Select a Billboard",
    },
  },
  create: {
    title: "Create category",
    description: "Add a new category",
  },
  edit: {
    title: "Edit the category",
    description: "Edit a category",
  },
} as const
