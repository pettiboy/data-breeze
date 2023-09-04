import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    setAccessToken: () => { },
    setRefreshToken: () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken') || null);
    const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken') || null);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        }
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                setAccessToken,
                setRefreshToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
