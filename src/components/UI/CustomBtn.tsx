import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../utils/globalStyles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  fontSize: number;
  margin?: number;
  color: string;
}

const CustomBtn: FC<ButtonProps> = ({
  onPress,
  title,
  fontSize,
  margin,
  color,
}) => {
  const font = {
    fontSize: fontSize,
  };
  const style = {
    margin: margin,
    backgroundColor: color,
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, font]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontWeight: "bold",
  },
});
