import {createContext, ReactNode, useState} from "react";
import {client} from "../supabase/supabase";
import {AuthResponse} from "@supabase/supabase-js";

export interface AuthContextProps {
    isAuth: boolean
    loggedUserId: string | undefined
    login: (email: string, password: string) => void
    register: (email: string, password: string) => void
    logout: () => void
}

interface AuthContextProvider {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    loggedUserId: undefined,
    login: () => {
    },
    register: () => {
    },
    logout: () => {
    }
})

const AuthContextProvider = ({children}: AuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loggedUserId, setLoggedUserId] = useState<string | undefined>(undefined)

    const login = async (email: string, password: string) => {
        return await client.auth.signInWithPassword({
            email: email,
            password: password
        }).then(async (response: AuthResponse) => {
            console.log(response.data)
            setLoggedUserId(response.data.user?.id)
            setIsAuth(true)
        })

    }

    const register = async (email: string, password: string) => {
        return await client.auth.signUp({
            email: email,
            password: password
        }).then(async (response: AuthResponse) => {
            console.log(response.data)
        })
    }

    const logout = async () => {
        return await client.auth.signOut().then(async () => {
            setIsAuth(false)
        })
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

export default AuthContextProvider
