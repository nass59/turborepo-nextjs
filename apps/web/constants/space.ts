export const SPACE_LABELS = {
  switcher: {
    heading: "Spaces",
    label: "Select a space",
    noSpaceFound: "No space found.",
    placeholder: "Search space...",
    create: "Create Space",
  },
  form: {
    name: {
      name: "name",
      placeholder: "Gaming",
    },
  },
  create: {
    title: "Create Space",
    desscription: "Add a new space to manage items and categories",
    toastMessage: "Space created.",
    action: "Create",
    error: "Your space was not created. Please try again.",
  },
  edit: {
    title: "Settings",
    desscription: "Manage space preferences",
    toastMessage: "Space updated.",
    action: "Save changes",
    error: "Your space was not updated. Please try again.",
  },
  delete: {
    toastMessage: "Space deleted.",
    error:
      "Your Space was not deleted. Make sure you removed all categories first.",
  },
} as const
