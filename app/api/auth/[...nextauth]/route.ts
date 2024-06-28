import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { getUserByEmail, createUser } from "@/model/users";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    Github({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user?.email && user?.name) {
        
        const exists = await getUserByEmail(user?.email);
        
        if (exists) {
          
          return true;
        }else {
          await createUser(user?.email, user?.name);
          return true;
        }
      }

      return false;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ token, session, user }) {
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };