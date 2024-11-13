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
    jwt({ token, user }) {
      console.log(user, "user");
      if (user) {
        token.id = user.id || "";
        token.role = user.role;
        token.status = user.status;
        token.shopId = user.shopId;
      }
      return token;
    },

    session({ session, token }) {
      console.log(token, "token");
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.status = token.status;
      session.user.shopId = token.shopId;
      console.log(session, "sessionssssssssss");
      return session;
    },
  },
});
// import NextAuth from "next-auth";
// import credentials from "next-auth/providers/credentials";
// import prisma from "./lib/db";
// import bcrypt from "bcryptjs";
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     credentials({
//       async authorize(
//         credentials: Partial<Record<string, unknown>>
//       ): Promise<any> {
//         if (credentials === null) return null;
//         try {
//           const dbUser = await prisma.user.findFirst({
//             where: {
//               email: credentials.email as string,
//             },
//             select: {
//               id: true,
//               email: true,
//               name: true,
//               password: true,
//               role: true,
//               status: true,
//               shopId: true,
//             },
//           });
//           if (dbUser) {
//             const isMatch = await bcrypt.compare(
//               credentials.password as string,
//               dbUser.password
//             );
//             if (isMatch) {
//               return dbUser;
//             }
//           }
//           return null;
//         } catch (e) {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//     error: "/login",
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id as string;
//         token.role = user.role as string;
//         token.status = user.status as string;
//         token.shopId = user.shopId as string;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id = token.id as any;
//       session.user.role = token.role as string;
//       session.user.status = token.status as string;
//       session.user.shopId = token.shopId as string;
//       return session;
//     },
//   },
// });
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "./lib/db";
// import bcrypt from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (!credentials) return null;
//         try {
//           const dbUser = await prisma.user.findUnique({
//             where: { email: credentials.email },
//             select: {
//               id: true,
//               email: true,
//               name: true,
//               password: true,
//               role: true,
//               status: true,
//               shopId: true,
//             },
//           });

//           if (
//             dbUser &&
//             (await bcrypt.compare(credentials.password, dbUser.password))
//           ) {
//             const { password, ...userWithoutPassword } = dbUser;
//             return userWithoutPassword; // Only return fields that you want in the token
//           }
//           return null;
//         } catch (error) {
//           console.error("Authorization error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id ?? "";
//         token.role = user.role;
//         token.status = user.status;
//         token.shopId = user.shopId;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       session.user.status = token.status;
//       session.user.shopId = token.shopId;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//     error: "/login",
//   },
// });
