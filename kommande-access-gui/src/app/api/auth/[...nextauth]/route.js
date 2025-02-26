// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

/**
 * NextAuth configuration object
 * Handles authentication for both traditional login and Google OAuth
 */
const authOptions = {
    providers: [
        // Google OAuth Provider - Using default profile handling
        GoogleProvider({
            name: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Credentials Provider for traditional login
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Call your backend API to validate credentials
                    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/user/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        mode: 'cors',
                        credentials: 'include',
                    });

                    // 即使响应不是OK的，也尝试读取响应主体
                    const userData = await response.json();

                    if (response.ok && userData) {
                        return userData;
                    }

                    // 如果响应不OK，记录错误但返回null
                    console.error('Login failed with status:', response.status, userData);
                    return null;
                } catch (error) {
                    console.error('Login failed:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign-in
            if (account && user) {
                // For Google sign in
                if (account.provider === 'google') {
                    return {
                        ...token,
                        id: user.id || user.sub, // Google provides 'sub' as user ID
                        name: user.name,
                        email: user.email,
                        image: user.image || user.picture, // Google provides 'picture' for image
                        provider: 'google'
                    };
                }
                // For credentials sign in
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    token: user.token,
                    provider: 'credentials'
                };
            }
            return token;
        },
        async session({ session, token }) {
            // Add user data from token to session
            session.user = {
                ...session.user,
                id: token.id,
                provider: token.provider
            };

            // Only add token if it exists (for credentials login)
            if (token.token) {
                session.user.token = token.token;
            }

            return session;
        },
    },
    pages: {
        signIn: '/users/Login',
        error: '/auth/error',
    },
};

// Create and export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };