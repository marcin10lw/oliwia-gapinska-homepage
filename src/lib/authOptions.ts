import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

import { signInSchema } from './schema/signInSchema.schema';
import { FRONTEND_ROUTES } from './navigation/routes.frontend';
import { validateForm } from './utils';
import { db } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: FRONTEND_ROUTES.signIn,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error('');

        const { email, password } = credentials;
        const validationRes = await validateForm(signInSchema, { email, password });

        if ('error' in validationRes) {
          throw new Error(validationRes.error.errors[0]);
        }

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('errors.userNotFound');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error('errors.wrongPassword');
        }

        return {
          id: user.id,
          userId: user.userId,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: false,
};
