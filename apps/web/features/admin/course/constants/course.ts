export const COURSE_LABELS = {
  resource: "courses",
  list: {
    resource: "courses",
    title: "Courses",
    description: "Manage courses for your space",
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
        copied: "Course Id copied to the clipboard",
        update: "Update",
        delete: "Delete",
      },
    },
  },
  api: {
    title: "API",
    description: "API calls for Courses",
    resourceId: "courseId",
  },
  form: {
    imageUrl: {
      name: "imageUrl",
      label: "Course Image",
    },
    title: {
      name: "title",
      label: "Title",
      placeholder: "Course title",
      description: "What will you teach in this course?",
    },
  },
  create: {
    title: "Create course",
    description: "Add a new course",
  },
  edit: {
    title: "Edit the course",
    description: "Edit a course",
  },
} as const
