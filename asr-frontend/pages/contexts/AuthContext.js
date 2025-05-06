// contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const router = useRouter();

useEffect(() => {
if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
}
}, []);

const login = (token) => {
if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    router.push('/transcription');
}
};

const logout = () => {
if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push('/login');
}
};

return (
<AuthContext.Provider
    value={{ isAuthenticated, setIsAuthenticated, login, logout }}  // 🔧 Added setIsAuthenticated
>
    {children}
</AuthContext.Provider>
);
};
