import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import React from "react";

type GuessMenuParamList = {
    Welcome: any,
    Login: any,
    Register: any
}

const Stack = createStackNavigator<GuessMenuParamList>()

const GuessMenu = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                headerShown: false
            }
            }/>
            <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false
            }
            }/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{
                headerTransparent: true,
                title: ""
            }
            }/>
        </Stack.Navigator>
    )
}

export default GuessMenu
