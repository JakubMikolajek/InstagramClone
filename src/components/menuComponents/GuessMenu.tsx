import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import { ParamListBase } from "@react-navigation/native";

const Stack = createStackNavigator<ParamListBase>();

const GuessMenu = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default GuessMenu;
