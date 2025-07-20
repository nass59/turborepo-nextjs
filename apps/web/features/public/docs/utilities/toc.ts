import { toc } from "mdast-util-toc";
import { type Nodes } from "mdast-util-toc/lib";
import { remark } from "remark";
import { visit } from "unist-util-visit";

type Item = {
  title: string;
  url: string;
  items?: Item[];
};

type Items = {
  items?: Item[];
};

export type TableOfContents = Items;

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

const flattenNode = (node: any) => {
  const p: any = [];

  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return;
    p.push(node.value);
  });

  return p.join(``);
};

const getItems = (node: any, current: Item | any): Items => {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url;
        current.title = flattenNode(node);
      }

      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = node.children.map((i: any) => getItems(i, {}));
    return current;
  }

  if (node.type === "listItem") {
    const heading = getItems(node.children[0], {});

    if (node.children.length > 1) {
      getItems(node.children[1], heading);
    }

    return heading;
  }

  return {};
};

const getToc = () => (node: Nodes, file: any) => {
  const table = toc(node);
  file.data = getItems(table.map, {});
};

export async function getTableOfContents(content: string) {
  const result = await remark().use(getToc).process(content);

  return result.data;
}
