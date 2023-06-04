import NextAuth from "next-auth/next"

import { authOptions } from "@/lib/auth"

export default NextAuth(authOptions)
