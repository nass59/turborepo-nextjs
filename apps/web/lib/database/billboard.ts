import Billboard, {
  type BillboardModel,
} from '@/lib/database/models/billboard';
import {
  count,
  createOne,
  deleteOneById,
  findAll,
  findOne,
  findOneById,
  updateOneById,
} from '@/lib/database/queries';

type BillboardModelProps = Pick<
  BillboardModel,
  'label' | 'imageUrl' | 'spaceId'
>;

type BillboardModelUpdateProps = Pick<BillboardModel, 'label' | 'imageUrl'>;

export function createBillboard(
  data: BillboardModelProps
): Promise<BillboardModel | null> {
  return createOne(Billboard, data);
}

export function deleteOneBillboard(
  billboardId: string
): Promise<BillboardModel | null> {
  return deleteOneById(Billboard, billboardId);
}

export function findFirstBillboardBySpaceId(
  spaceId: string
): Promise<BillboardModel | null> {
  return findOne(Billboard, { spaceId });
}

export function findAllBillboardsBySpaceId(
  spaceId: string
): Promise<BillboardModel[] | []> {
  return findAll(Billboard, { spaceId });
}

export function countAllBillboardsBySpaceId(spaceId: string): Promise<number> {
  return count(Billboard, { spaceId });
}

export function findOneBillboard(
  billboardId: string
): Promise<BillboardModel | null> {
  return findOneById(Billboard, billboardId);
}

export function updateOneBillboard(
  billboardId: string,
  data: BillboardModelUpdateProps
): Promise<BillboardModel | null> {
  return updateOneById(Billboard, billboardId, data);
}
