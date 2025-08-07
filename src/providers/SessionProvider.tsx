"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
} 

// "use client";

// import { SessionProvider as NextAuthSessionProvider, SessionContext } from "next-auth/react";
// import { ReactNode } from "react";

// interface SessionProviderProps {
//     children: ReactNode;
// }

// export function SessionProvider({ children }: { children: React.ReactNode }) {
//     // Always provide a fake session
//     const fakeSession = {
//         user: { id: "dev", name: "Dev User", email: "dev@example.com" },
//         expires: "2099-12-31T23:59:59.999Z",
//     };

//      // Provide a no-op update function to satisfy the type
//     const update = async () => fakeSession;
    
//     return (
//         <SessionContext.Provider value={{ data: fakeSession, status: "authenticated", update}}>
//             {children}
//         </SessionContext.Provider>
//     );
// }