import { type NextPage } from "next"
import { SignIn } from "@clerk/nextjs"

/**
 * Page is a Next.js page component that renders the SignIn component from Clerk.
 * This page is used for handling user sign-in.
 */
const Page: NextPage = () => {
  return <SignIn />
}

export default Page
