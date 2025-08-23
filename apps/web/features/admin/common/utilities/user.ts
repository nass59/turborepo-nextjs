import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { routes } from '@/constants/routes';

export const getCurrentUserId = async () => {
  // Get the current user's ID
  const { userId } = await auth();

  // If the user is not authenticated, redirect to the sign in page
  if (!userId) {
    redirect(routes.signIn);
  }

  return userId;
};
