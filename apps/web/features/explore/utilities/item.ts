import { env } from "process"

import { findAllItemsBySpaceId } from "@/lib/database/items"

export const getItems = async () =>
  await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    isFeatured: true,
    isArchived: false,
  })
