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
            console.log('Attempting to log in with email:', email);

            setAccessToken(null);
            setUser(null);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Login failed` || error.message);
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            setUser(data.user);

            console.log('Login successful for user:', data.user);

            return data;

        } catch (error) {
            console.error('Login error: ', error);
            return error;
        }
    }

    const register = async (email, password) => {
        try {
            console.log('Attempting to register with email:', email);

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error("Registration error" || error.message)
            }
            
            const data = await response.json();
            
            setAccessToken(data.accessToken);
            setUser(data.user);

            console.log('Registration successful for user:', data.user);

            return data
        } catch (error) {
            console.error('Registration error: ', error);
            return error;
        }
    }

    const logout = async () => {
        try {
            console.log('Attempting to log out');

            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            const data = await response.json()

            setAccessToken(null);
            setUser(null);

            return data
        } catch (error) {
            console.error('Logout error: ', error);
            return error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}