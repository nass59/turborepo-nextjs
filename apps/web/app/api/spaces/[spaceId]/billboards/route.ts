import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import {
  createBillboard,
  findAllBillboardsBySpaceId,
} from '@/lib/database/billboard';
import { findOneSpace } from '@/lib/database/space';

type PostProps = {
  params: Promise<{
    spaceId: string;
  }>;
};

type JsonResponse = {
  label: string | null;
  imageUrl: string | null;
};

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = await auth();
    const { spaceId } = await params;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = (await req.json()) as JsonResponse;
    const { label, imageUrl } = body;

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!spaceId) {
      return new NextResponse('Space ID is required', { status: 400 });
    }

    const spaceByUserId = await findOneSpace(spaceId, userId);

    if (!spaceByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await createBillboard({
      label,
      imageUrl,
      spaceId,
    });

    return NextResponse.json(billboard);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(_: Request, { params }: PostProps) {
  try {
    const { spaceId } = await params;

    if (!spaceId) {
      return new NextResponse('Space ID is required', { status: 400 });
    }

    const billboards = await findAllBillboardsBySpaceId(spaceId);

    return NextResponse.json(billboards);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}
