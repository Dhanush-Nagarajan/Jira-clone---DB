import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const savedToken = localStorage.getItem('token');

        if (savedUser && savedToken) {
            setUser(savedUser);
            setToken(savedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
