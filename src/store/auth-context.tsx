import {createContext, ReactNode, useState} from "react";
import {client} from "../supabase/supabase";
import {AuthResponse} from "@supabase/supabase-js";

export interface AuthContextProps {
    isAuth: boolean
    loggedUserId: any
    login: (email: string, password: string) => void
    register: (email: string, password: string) => void
    logout: () => void
}

interface AuthContextProvider {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    loggedUserId: "",
    login: () => {
    },
    register: () => {
    },
    logout: () => {
    }
})

const AuthContextProvider = ({children}: AuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loggedUserId, setLoggedUserId] = useState<any>("")

    const login = async (email: string, password: string) => {
        return await client.auth.signInWithPassword({
            email: email,
            password: password
        }).then(async (response: AuthResponse) => {
            setLoggedUserId(response.data.user?.id)
            setIsAuth(true)
        })

    }

    const register = async (email: string, password: string) => {
        return await client.auth.signUp({
            email: email,
            password: password
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
