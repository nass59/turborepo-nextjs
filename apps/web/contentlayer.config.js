import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  url: {
    type: "string",
    resolve: (post) => `/${post._raw.flattenedPath}`,
  },
  slug: {
    type: "string",
    resolve: (post) => post._raw.flattenedPath.split("/").slice(1).join(""),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true,
    },
    image: {
      type: "string",
      description: "The image of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the author",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the author",
    },
    avatar: {
      type: "string",
      description: "The avatar of the author",
      required: true,
    },
    twitter: {
      type: "string",
      description: "The twitter account of the author",
      required: true,
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the page",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author, Page],
});
