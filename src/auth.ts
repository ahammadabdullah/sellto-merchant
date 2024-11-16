import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
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
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            shopId: true,
          },
        });
        if (dbUser) {
          token.id = dbUser.id as string;
          token.role = dbUser.role as string;
          token.status = dbUser.status as string;
          token.shopId = (dbUser.shopId as string) || "dbUser.shopId";
        }
      }
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.status = user.status as string;
        token.shopId = (user.shopId as string) || "user.shopId";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      session.user.shopId = (token.shopId as string) || "session.shopId";
      return session;
    },
  },
});
