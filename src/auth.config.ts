import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    credentials({
      async authorize(
        credentials: Partial<Record<string, unknown>>
      ): Promise<any> {
        if (!credentials) return null;
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            select: {
              id: true,
              email: true,
              role: true,
              status: true,
              shopId: true,
              password: true,
            },
          });

          if (
            dbUser &&
            (await bcrypt.compare(
              credentials.password as string,
              dbUser.password
            ))
          ) {
            const { password, ...userWithoutPassword } = dbUser;
            return userWithoutPassword;
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          id: user.id as string,
          role: user.role as string,
          status: user.status as string,
          shopId: user.shopId as string,
          email: user.email as string,
        };
      }
      if (trigger === "update" && session.shopId) {
        return {
          ...token,
          id: session.user.id as string,
          role: session.user.role as string,
          status: session.user.status as string,
          shopId: session.user.shopId as string,
          email: session.user.email as string,
        };
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      session.user.shopId = token.shopId as string;
      session.user.email = token.email as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
