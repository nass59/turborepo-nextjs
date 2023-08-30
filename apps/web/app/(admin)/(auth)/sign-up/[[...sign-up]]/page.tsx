import { type NextPage } from "next"
import { SignUp } from "@clerk/nextjs"

/**
 * Page is a Next.js page component that renders the SignUp component from Clerk.
 * This page is used for handling user sign-up.
 */
const Page: NextPage = () => {
  return <SignUp />
}

export default Page
