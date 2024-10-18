import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>
      ): Promise<any> {
        if (credentials === null) return null;
        let user = null;
        try {
          const dbUser = await prisma.user.findFirst({
            where: {
              email: credentials.email as string,
            },
          });
          if (dbUser) {
            const isMatch = await bcrypt.compare(
              credentials.password as string,
              dbUser.password
            );
            if (isMatch) {
              user = dbUser;
              return user;
            } else {
              return user;
            }
          } else {
            return user;
          }
        } catch (e) {
          return user;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (pathname.startsWith("/login") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.status = user.status as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as any;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      return session;
    },
  },
});
