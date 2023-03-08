import React, {useContext} from "react";
import {AuthContext, AuthContextTypes} from "../../store/auth-context";
import {NavigationContainer} from "@react-navigation/native";
import GuessMenu from "./GuessMenu";
import AuthMenu from "./AuthMenu";

const RootMenu: React.FC = () => {
    const authCtx: AuthContextTypes = useContext(AuthContext)
    const isAuth: boolean = authCtx.isAuth
    return (
        <NavigationContainer>
            {isAuth ? <AuthMenu/> : <GuessMenu/>}
        </NavigationContainer>
    )
}

export default RootMenu
