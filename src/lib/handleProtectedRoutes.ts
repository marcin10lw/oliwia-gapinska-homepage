'use server';

import { getServerSession } from 'next-auth';

import { FRONTEND_ROUTES } from './navigation/routes.frontend';
import { authOptions } from './authOptions';
import { redirect } from 'next/navigation';

export const handleNoSessionRedirect = async (href: string = FRONTEND_ROUTES.signIn) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(href);
  } else {
    return session;
  }
};

export const handleWithSessionRedirect = async (href: string = FRONTEND_ROUTES.dashboard) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(href);
  }
};
