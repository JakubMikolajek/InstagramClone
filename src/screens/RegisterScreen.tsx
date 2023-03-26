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
import Header from "../components/UI/Header";
import RegisterForm from "../components/formsComponents/RegisterForm";
import { screenHeight, screenWidth } from "../utils/dimension";

const RegisterScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <Header title="Register" />
            <RegisterForm />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
