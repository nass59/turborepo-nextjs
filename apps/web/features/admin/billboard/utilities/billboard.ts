import { format } from "date-fns"

import { findAllBillboardsBySpaceId } from "@/lib/database/billboard"

import { type BillboardColumn } from "../ui/columns"

export const getAllBillboards = async (
  spaceId: string
): Promise<BillboardColumn[]> => {
  const billboards = await findAllBillboardsBySpaceId(spaceId)

  return billboards.map((item) => ({
    id: item._id.toString(),
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
}