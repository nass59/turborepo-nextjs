import { Types } from 'mongoose';

import Space, { type SpaceModel } from '@/lib/database/models/space';
import {
  createOne,
  deleteOne,
  findAll,
  findOne,
  updateOne,
} from '@/lib/database/queries';

type SpaceModelProps = Pick<SpaceModel, 'name' | 'userId'>;
type SpaceModelUpdateProps = Pick<SpaceModel, 'name'>;

export function createSpace(data: SpaceModelProps): Promise<SpaceModel | null> {
  return createOne(Space, data);
}

export function deleteOneSpace(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  return deleteOne(Space, {
    _id: new Types.ObjectId(spaceId),
    userId,
  });
}

export function findAllSpacesByUserId(
  userId: string
): Promise<SpaceModel[] | []> {
  return findAll(Space, { userId });
}

export function findFirstBySpaceId(
  spaceId: string
): Promise<SpaceModel | null> {
  return findOne(Space, { _id: new Types.ObjectId(spaceId) });
}

export function findFirstSpaceByUserId(
  userId: string
): Promise<SpaceModel | null> {
  return findOne(Space, { userId });
}

export function findOneSpace(
  spaceId: string,
  userId: string
): Promise<SpaceModel | null> {
  return findOne(Space, {
    _id: new Types.ObjectId(spaceId),
    userId,
  });
}

export function updateOneSpace(
  spaceId: string,
  userId: string,
  data: SpaceModelUpdateProps
): Promise<SpaceModel | null> {
  return updateOne(
    Space,
    {
      _id: new Types.ObjectId(spaceId),
      userId,
    },
    data
  );
}
