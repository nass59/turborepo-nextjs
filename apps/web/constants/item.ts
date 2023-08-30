export const ITEM_LABELS = {
  list: {
    title: "Items",
    desscription: "Manage items for your space",
    add: "Add new",
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
