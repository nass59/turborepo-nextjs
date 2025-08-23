import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { createItem, findAllItemsBySpaceId } from '@/lib/database/items';
import { findOneSpace } from '@/lib/database/space';

type PostProps = {
  params: Promise<{
    spaceId: string;
  }>;
};

type JsonResponse = {
  name: string | null;
  categoryId: string | null;
  images: [];
  isFeatured: boolean;
  isArchived: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: default
const removeUndefinedValuesFromObject = <T>(obj: any): T => {
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = await auth();
    const { spaceId } = await params;

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

    if (!spaceId) {
      return new NextResponse('Space ID is required', { status: 400 });
    }

    const spaceByUserId = await findOneSpace(spaceId, userId);

    if (!spaceByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const item = await createItem({
      name,
      categoryId,
      isFeatured,
      isArchived,
      images,
      spaceId,
    });

    return NextResponse.json(item);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request, { params }: PostProps) {
  try {
    const { spaceId } = await params;
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!spaceId) {
      return new NextResponse('Space ID is required', { status: 400 });
    }

    const items = await findAllItemsBySpaceId(
      removeUndefinedValuesFromObject({
        spaceId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      })
    );

    return NextResponse.json(items);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}
