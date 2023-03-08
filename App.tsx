import {SafeAreaProvider} from "react-native-safe-area-context";
import AuthContextProvider from "./src/store/auth-context";
import RootMenu from "./src/components/menu/RootMenu";
import React from "react";

const App: React.FC = () => {
    return (
        <SafeAreaProvider>
            <AuthContextProvider>
                <RootMenu/>
            </AuthContextProvider>
        </SafeAreaProvider>
    );
}

export default App
