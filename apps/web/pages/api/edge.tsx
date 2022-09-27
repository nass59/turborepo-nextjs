import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const user = {
    name: "Jim Halpert",
  };

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  return new Response(JSON.stringify({ ...user, email }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
