import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { createSpace } from '@/lib/database/space';

type JsonResponse = {
  name: string | null;
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = (await req.json()) as JsonResponse;
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const space = await createSpace({ name, userId });

    return NextResponse.json(space);
  } catch {
    return new NextResponse('Internal error', { status: 500 });
  }
}
