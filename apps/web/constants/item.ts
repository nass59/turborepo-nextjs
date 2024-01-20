export const ITEM_LABELS = {
  resource: "items",
  list: {
    resource: "items",
    title: "Items",
    description: "Manage items for your space",
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
    description: "API calls for Items",
    resourceId: "itemId",
  },
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
  create: {
    title: "Create item",
    description: "Add a new item",
  },
  edit: {
    title: "Edit item",
    description: "Edit a item",
  },
} as const
