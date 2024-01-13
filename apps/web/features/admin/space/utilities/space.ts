import {
  findAllSpacesByUserId,
  findFirstSpaceByUserId,
  findOneSpace,
} from "@/lib/database/space"

export const getCurrentSpace = async (userId: string) => {
  return await findFirstSpaceByUserId(userId)
}

export const getSpace = async (spaceId: string, userId: string) => {
  return await findOneSpace(spaceId, userId)
}

export const getAllSpaces = async (userId: string) => {
  return await findAllSpacesByUserId(userId)
}
