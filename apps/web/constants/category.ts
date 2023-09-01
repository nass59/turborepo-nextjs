export const CATEGORY_LABELS = {
  list: {
    title: "Categories",
    desscription: "Manage categories for your space",
    add: "Add new",
    columns: {
      name: {
        accessorKey: "name",
        header: "Name",
      },
      billboard: {
        accessorKey: "billboard",
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
    desscription: "API calls for Categories",
    entityName: "categories",
    entityIdName: "categoryId",
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
    desscription: "Add a new category",
    toastMessage: "Category created.",
    action: "Create",
    error: "Your category was not created. Please try again.",
  },
  edit: {
    title: "Edit category",
    desscription: "Edit a category",
    toastMessage: "Category updated.",
    action: "Save changes",
    error: "Your category was not updated. Please try again.",
  },
  delete: {
    toastMessage: "Category deleted.",
    error:
      "Your category was not deleted. Make sure to delete all items before deleting this category.",
  },
} as const
