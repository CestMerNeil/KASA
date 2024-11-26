'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';

/**
 * User Context for managing global user state
 * Integrates with NextAuth session management
 */
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);

    // Sync user state with session
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            const userData = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                provider: session.user.provider,
                token: session.user.token // Only available for credentials login
            };
            setUser(userData);
            // Store in sessionStorage for persistence
            sessionStorage.setItem('user', JSON.stringify(userData));
        } else if (status === 'unauthenticated') {
            setUser(null);
            sessionStorage.removeItem('user');
        }
    }, [session, status]);

    // Initialize user from sessionStorage
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser && !user) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    /**
     * Update user data after successful login
     * @param {Object} userData - User data from login response
     */
    const userLoggedIn = async (userData) => {
        try {
            const newUserData = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                image: userData.image,
                provider: userData.provider,
                token: userData.token
            };
            setUser(newUserData);
            sessionStorage.setItem('user', JSON.stringify(newUserData));
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    /**
     * Clear user data after logout
     */
    const userLoggedOut = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    /**
     * Update specific user fields
     * @param {Object} updates - Object containing fields to update
     */
    const updateUser = (updates) => {
        try {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const value = {
        user,
        userLoggedIn,
        userLoggedOut,
        updateUser,
        isLoading: status === 'loading',
        isAuthenticated: status === 'authenticated'
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use the user context
 * @throws {Error} If used outside of UserProvider
 */
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;