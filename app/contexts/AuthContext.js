'use client'

import {
    createContext, 
    useState, 
    useEffect
} from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include'
            })

            if (!response.ok) {
                throw new Error('Failed request to refresh access token (from AuthContext)')
            }

            const data = await response.json()

            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Error refreshing token (from AuthContext): ', {
                message: error.message,
                status: error.status,
                endpoint: error.endpoint,
                timestamp: new Date().toISOString(),
                originalError: error.originalError
            });

            setAccessToken(null);
            setUser(null);

            const enhancedError = new Error(`Auth Error in refreshAccessToken: ${error.message}`);
            enhancedError.originalError = error;
            enhancedError.context = 'login';
            
            throw enhancedError;
        }
    }

    const authFetch = async (url, options = {}) => {
        options = { // ensures it is defined
            headers: {},
            ...options,
        }

        if (accessToken) {
            options.headers['Authorization'] = `Bearer ${accessToken}`
        }

        let response = await fetch(url, options);

        // If accessToken expired (error 401 Unauthorized)
        if (response.status === 401) {
            try {
                // refresh it
                const newAccessToken = await refreshAccessToken();
                options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await fetch(url, options);
            } catch (error) {
                console.error('Error retrying the fetch in authFetch function (from AuthContext): ', {
                    message: error.message,
                    status: error.status,
                    endpoint: error.endpoint,
                    timestamp: new Date().toISOString(),
                    originalError: error.originalError
                });
                await logout();
                router.push('/login');
                throw error
            }
        }

        return response;
    }

    const login = async (email, password) => {
        try {
            console.log(`Attempting to log in with email: ${email}; at ${API_BASE_URL}`);

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
                throw new Error(error.message);
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            setUser(data.user);

            console.log('Login successful');
            // console.log('Login successful for user:', data);

            return data;

        } catch (error) {
            console.error('Error in the login request: ', error);
            throw error;
        }
    }

    const register = async (email, password) => {
        try {
            console.log(`Attempting to register with email: ${email}; at ${API_BASE_URL}`);

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

            console.log('Registration successful');
            // console.log('Registration successful for user:', data);

            return data
        } catch (error) {
            console.error('Registration error: ', error);
            throw error;
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
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, register, logout, authFetch }}>
            {children}
        </AuthContext.Provider>
    )
}