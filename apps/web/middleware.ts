import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/blog(.*)",
    "/docs(.*)",
    "/terms",
    "/privacy",
    "/api/og(.*)",
  ],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
