import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import LoginForm from "../components/formsComponents/LoginForm";
import Header from "../components/UI/Header";
import { screenHeight, screenWidth } from "../utils/dimension";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../utils/globalStyles";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <Header title="Login" />
            <LoginForm />
            <CustomBtn
              onPress={() => navigation.navigate("Register")}
              title="Register"
              fontSize={14}
              color={colors.lightBlue}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: screenHeight,
    justifyContent: "center",
    width: screenWidth,
  },
  outerContainer: {
    flex: 1,
  },
});
