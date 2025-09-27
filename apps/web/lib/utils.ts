import { env } from '@/env.mjs';
import type { TreeItem, TreeNode } from '@/types/code';

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function parseData<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

export const convertFilesToTreeItems = (files: {
  [path: string]: string;
}): TreeItem[] => {
  // Build the tree structure
  const tree: TreeNode = {};

  // Sort paths to ensure consistent order
  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split('/');
    let current = tree;

    // Traverse or create the tree nodes
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];

      if (!part) {
        continue;
      }

      if (!current[part]) {
        current[part] = {};
      }

      current = current[part];
    }

    const fileName = parts.at(-1);

    if (fileName) {
      // Add the file as a leaf node
      current[fileName] = null;
    }
  }

  // Convert the tree structure to TreeItem format
  const convertNode = (
    node: TreeNode,
    name?: string
  ): TreeItem[] | TreeItem => {
    const entries = Object.entries(node);

    if (entries.length === 0) {
      return name || '';
    }

    const children: TreeItem[] = [];

    for (const [key, value] of entries) {
      if (value === null) {
        // It's a file
        children.push(key);
      } else {
        // It's a directory
        const subTree = convertNode(value, key);

        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        } else {
          children.push([key, subTree]);
        }
      }
    }

    return children;
  };

  const result = convertNode(tree);

  return Array.isArray(result) ? result : [result];
};
