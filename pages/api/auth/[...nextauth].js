import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  site: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },

  debug: true,
};

export default NextAuth(authOptions);
