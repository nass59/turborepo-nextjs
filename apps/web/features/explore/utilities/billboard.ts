import { env } from "@/env.mjs"
import { findFirstBillboardBySpaceId } from "@/lib/database/billboard"

export const getBillboard = async () =>
  await findFirstBillboardBySpaceId(env.SPACE_ID)
