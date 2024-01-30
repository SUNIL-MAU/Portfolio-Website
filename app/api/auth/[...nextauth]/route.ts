import { db } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { u } from "uploadthing/dist/types-b5a44cf1";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // console.log(credentials, "credial");
        // const user = await db.user.findFirst({
        //   where: {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   },
        // });
        // console.log("user sjflsjl", user);
        // if (!user) {
        //   return null;
        // }

        const user = {
          id: "lksjlk",
          email: "kakarot71297@gmail.com",
          password: "Monday@13921",
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("server session console", session);
      return session;
    },
    async jwt({ token }) {
      console.log("server token console", token);

      return token;
    },
  },
});

export { handler as GET, handler as POST };
