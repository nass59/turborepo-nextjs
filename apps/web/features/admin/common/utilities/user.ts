import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { routes } from "@/constants/routes";

export const getCurrentUserId = () => {
  // Get the current user's ID
  const { userId } = auth();

  // If the user is not authenticated, redirect to the sign in page
  if (!userId) {
    redirect(routes.signIn);
  }

  return userId;
};
