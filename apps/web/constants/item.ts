export const ITEM_LABELS = {
  form: {
    images: {
      name: "images",
      label: "Images",
    },
    name: {
      name: "name",
      label: "Name",
      placeholder: "Item name",
    },
    categoryId: {
      name: "categoryId",
      label: "Category",
      placeholder: "Select a category",
    },
    isFeatured: {
      name: "isFeatured",
      label: "Featured",
      description: "This item will appear on the home page.",
    },
    isArchived: {
      name: "isArchived",
      label: "Archived",
      description: "This item will not appear anywhere in the space.",
    },
  },
  list: {
    title: "Items",
    desscription: "Manage items for your space",
    add: "Add new",
    columns: {
      name: {
        accessorKey: "name",
        header: "Name",
      },
      isArchived: {
        accessorKey: "isArchived",
        header: "Archived",
      },
      isFeatured: {
        accessorKey: "isFeatured",
        header: "Featured",
      },
      category: {
        accessorKey: "category",
        header: "Category",
      },
      createdAt: {
        accessorKey: "createdAt",
        header: "Date",
      },
      actions: {
        label: "Actions",
        open: "Open menu",
        copy: "Copy Id",
        copied: "Item Id copied to the clipboard",
        update: "Update",
        delete: "Delete",
      },
    },
  },
  api: {
    title: "API",
    desscription: "API calls for Items",
    entityName: "items",
    entityIdName: "itemId",
  },
  create: {
    title: "Create item",
    desscription: "Add a new item",
    toastMessage: "Item created.",
    action: "Create",
    error: "Your item was not created. Please try again.",
  },
  edit: {
    title: "Edit item",
    desscription: "Edit a item",
    toastMessage: "Item updated.",
    action: "Save changes",
    error: "Your item was not updated. Please try again.",
  },
  delete: {
    toastMessage: "Item deleted.",
    error: "Your item was not deleted. Please try again.",
  },
} as const
