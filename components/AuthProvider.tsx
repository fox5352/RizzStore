"use client";
import { SessionProvider } from "next-auth/react";

export default async function AuthProvider({ children, session}: { children: React.ReactNode, session: any }) {
    return (
        <SessionProvider session={session as any}>
            {children}
        </SessionProvider>
    )
}