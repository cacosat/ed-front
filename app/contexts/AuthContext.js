'use client'

import {
    createContext, 
    useState, 
    useEffect
} from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = async (email, password) => {
        try {
            
        } catch (error) {
            console.error('Login error: ', error);
            throw error;
        }
    }

    const register = async (email, password) => {
        try {
            
        } catch (error) {
            console.error('Registration error: ', error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            
        } catch (error) {
            console.error('Logout error: ', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}