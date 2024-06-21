import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    userId: string;
    email: string;
    name: string;
    lastName: string;
  }
  interface Session {
    user: User & {
      id: number;
      userId: string;
      email: string;
      name: string;
      lastName: string;
    };
  }
}
