import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthContextProvider from "./src/store/auth-context";
import RootMenu from "./src/components/menuComponents/RootMenu";
import React, { FC } from "react";

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <RootMenu />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
