import {createContext, ReactNode, useState} from "react";

interface AuthContext {
    isAuth: boolean
    loggedUserId: string | null
    login: (email: string, password: string) => void
    register: (email: string, password: string) => void
    logout: () => void
}

interface AuthContextProvider {
    children: ReactNode
}

export const AuthContext = createContext<AuthContext>({
    isAuth: false,
    loggedUserId: null,
    login: (email, password) => {
    },
    register: (email, password) => {
    },
    logout: () => {
    }
})

const AuthContextProvider = ({children}: AuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loggedUserId, setLoggedUserId] = useState<string | null>(null)

    const login = () => {
    }

    const register = () => {
    }

    const logout = () => {
    }

    const value = {
        isAuth: isAuth,
        loggedUserId: loggedUserId,
        login,
        register,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
