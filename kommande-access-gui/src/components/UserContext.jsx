'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const userLoggedIn = async (userData) => {
        try {
            setUser(userData);
            sessionStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    const userLoggedOut = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    const value = {
        user,
        userLoggedIn,
        userLoggedOut
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

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export default UserContext;