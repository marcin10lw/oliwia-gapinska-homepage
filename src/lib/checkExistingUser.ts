'use server';

import { Session, getServerSession } from 'next-auth';
import { User } from '@prisma/client';

import { authOptions } from './authOptions';
import { db } from './prisma';

interface CheckExistingUserError {
  ok: false;
  error: string;
}

interface CheckExistingUserResponse {
  ok: true;
  user: User;
  session: Session | null;
}

export const checkExistingUser = async <T>(): Promise<CheckExistingUserError | CheckExistingUserResponse> => {
  try {
    const session = await getServerSession(authOptions);
    const user = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    if (!session || !user) {
      throw new Error();
    }

    return { ok: true, session, user };
  } catch (error) {
    return { ok: false, error: 'errors.userNotFound' };
  }
};
