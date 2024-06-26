import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// import { createUser, getUserByEmail, userExists } from "@/models/user.model";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    Github({
      clientId: process.env.NEXT_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET!,
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {

    //   if (profile?.email) {
    //     const exists = await userExists(profile?.email)

    //     if (exists) {
    //       return true;
    //     } else {
    //       await createUser(profile?.email);

    //       return true;
    //     }

    //   }

      return true;
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