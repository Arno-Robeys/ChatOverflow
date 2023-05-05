import type { Session, User } from 'next-auth';
import type { YWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
    }
}

declare module "next-auth" {
  interface Session {
    user: {
        id: string;
        name: string;
        email: string;
        accessToken: string;
    };
  }
}