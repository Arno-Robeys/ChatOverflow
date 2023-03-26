import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/',
    },
    providers: [        
        CredentialsProvider({id: "email-login", name: "Login", credentials: {}, async authorize(credentials) {
            const { email, password } = credentials as { email: string, password: string};

            const users = await fetch('http://localhost:3000/user');

            const user = ((await users.json()) as {userid: number, firstname: string, lastname: string, email: string, password: string, nickname?: string}[]).find((us) => us.email === email && us.password == password)

            return !user ? null : {id: user.userid.toString(), name: user.firstname +' '+ user.lastname, email: user.email};
        },
        }),
    ],

    callbacks: {
        session: async ({token, session}) => {
            session.user.id = token.sub ?? token.id;
            return Promise.resolve(session);
        },
      },

};

export default NextAuth(authOptions);
