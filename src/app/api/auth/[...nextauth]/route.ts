import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// @ts-ignore
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
