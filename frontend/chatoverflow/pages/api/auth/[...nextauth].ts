import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/',
    },
    providers: [        
        CredentialsProvider({id: "email-login", name: "Login", credentials: {}, async authorize(credentials) {
            const { email, password } = credentials as { email: string, password: string};

            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const respjson = await response.json();

            return !respjson ? null : {id: respjson.user.userid.toString(), name: respjson.user.firstname +' '+ respjson.user.lastname, email: respjson.user.email};
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
