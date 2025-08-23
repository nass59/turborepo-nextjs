import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  deleteOneSpace,
  findFirstBySpaceId,
  updateOneSpace,
} from "@/lib/database/space";

interface ApiProps {
  params: Promise<{
    spaceId: string;
  }>;
}

interface JsonResponse {
  name: string | null;
}

export async function PATCH(req: Request, { params }: ApiProps) {
  try {
    const { userId } = await auth();
    const { spaceId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = (await req.json()) as JsonResponse;
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!spaceId) {
      return new NextResponse("Space Id is required", { status: 400 });
    }

    const space = await updateOneSpace(spaceId, userId, { name });

    return NextResponse.json(space);
  } catch (error) {
    console.log("[SPACES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: ApiProps) {
  try {
    const { userId } = await auth();
    const { spaceId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!spaceId) {
      return new NextResponse("Space Id is required", { status: 400 });
    }

    const space = await deleteOneSpace(spaceId, userId);

    return NextResponse.json(space);
  } catch (error) {
    console.log("[SPACES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: ApiProps) {
  try {
    const { spaceId } = await params;

    if (!spaceId) {
      return new NextResponse("Space Id is required", { status: 400 });
    }

    const space = await findFirstBySpaceId(spaceId);

    return NextResponse.json(space);
  } catch (error) {
    console.log("[SPACE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
