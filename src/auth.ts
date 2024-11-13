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
            // Return only needed user data, excluding the password
            const { password, ...userWithoutPassword } = dbUser;
            return userWithoutPassword;
          }
          return null; // Explicitly return null if credentials do not match
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
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.status = user.status as string;
        token.shopId = user.shopId as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.status = token.status as string;
      session.user.shopId = token.shopId as string;
      return session;
    },
  },
});
