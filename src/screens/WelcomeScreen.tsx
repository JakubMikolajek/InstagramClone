import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import { colors } from "../utils/globalStyles";

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <CustomBtn
        onPress={() => navigation.replace("Login")}
        fontSize={16}
        title="Start your journey"
        color={colors.lightBlue}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#63b8df",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 24,
  },
});
