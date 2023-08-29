export const CATEGORY_LABELS = {
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
