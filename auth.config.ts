import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith('/agente/dashboard');
            const isOnSupervisorDashboard = request.nextUrl.pathname.startsWith('/supervisor/dashboard');

            if (!isLoggedIn) return false;
            if (isOnSupervisorDashboard) {
                if (isLoggedIn && auth?.user?.email === 'moi@moi.com') return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && auth?.user?.email === 'moi@moi.com') {
                return Response.redirect(new URL('/supervisor/dashboard', request.nextUrl));
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/agente/dashboard', request.nextUrl));
            }

            return true;



        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;