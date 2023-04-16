import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default Header;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
