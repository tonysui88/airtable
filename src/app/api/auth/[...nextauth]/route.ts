// import { handlers } from "~/server/auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { adapter } from "next/dist/server/web/adapter";

const prisma = new PrismaClient();

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.AUTH_SECRET,
}

const { handlers } = NextAuth(authOptions)

export const GET = handlers.GET
export const POST = handlers.POST
