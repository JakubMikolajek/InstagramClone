import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: any;
  size: number;
  color: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default Icon;
