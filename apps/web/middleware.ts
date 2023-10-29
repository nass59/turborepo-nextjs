import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/blog(.*)",
    "/products(.*)",
    "/docs(.*)",
    "/terms",
    "/privacy",
    "/api/og(.*)",
    "/api/:path*",
  ],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc|dashboard)(.*)"],
}
