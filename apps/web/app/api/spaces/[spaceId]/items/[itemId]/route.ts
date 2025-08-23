import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import {
  deleteOneItem,
  findOneItem,
  updateOneItem,
} from '@/lib/database/items';
import { findOneSpace } from '@/lib/database/space';

type ApiProps = {
  params: Promise<{
    spaceId: string;
    itemId: string;
  }>;
};

type PatchProps = ApiProps;
type DeleteProps = ApiProps;

type GetProps = {
  params: Promise<{
    itemId: string;
  }>;
};

type JsonResponse = {
  name: string | null;
  categoryId: string | null;
  images: [];
  isFeatured: boolean;
  isArchived: boolean;
};

export async function GET(_: Request, { params }: GetProps) {
  const { itemId } = await params;

  try {
    if (!itemId) {
      return new NextResponse('Item Id is required', { status: 400 });
    }

    const item = await findOneItem(itemId);

    return NextResponse.json(item);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: PatchProps) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = (await req.json()) as JsonResponse;
    const { name, categoryId, images, isFeatured, isArchived } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images?.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category Id URL is required', { status: 400 });
    }

    const { spaceId, itemId } = await params;
    const spaceByUserId = await findOneSpace(spaceId, userId);

    if (!spaceByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const item = await updateOneItem(itemId, {
      name,
      categoryId,
      images,
      isFeatured,
      isArchived,
    });

    return NextResponse.json(item);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: DeleteProps) {
  try {
    const { userId } = await auth();
    const { spaceId, itemId } = await params;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!itemId) {
      return new NextResponse('Item Id is required', { status: 400 });
    }

    const spaceByUserId = await findOneSpace(spaceId, userId);

    if (!spaceByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const item = await deleteOneItem(itemId);

    return NextResponse.json(item);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}
