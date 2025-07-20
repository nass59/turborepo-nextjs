import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  createCategory,
  findAllCategoriesBySpaceId,
} from "@/lib/database/category";
import { findOneSpace } from "@/lib/database/space";

type PostProps = {
  params: {
    spaceId: string;
  };
};

interface JsonResponse {
  name: string | null;
  billboardId: string | null;
}

export async function POST(req: Request, { params }: PostProps) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = (await req.json()) as JsonResponse;
    const { name, billboardId } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 });
    }

    const spaceByUserId = await findOneSpace(params.spaceId, userId);

    if (!spaceByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await createCategory({
      name,
      billboardId,
      spaceId: params.spaceId,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: PostProps) {
  try {
    if (!params.spaceId) {
      return new NextResponse("Space ID is required", { status: 400 });
    }

    const categories = await findAllCategoriesBySpaceId(params.spaceId);

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
