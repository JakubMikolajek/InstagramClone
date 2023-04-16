import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: any;
  size: number;
  color: string;
}

const Icon: FC<IconProps> = ({ name, size, color }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default Icon;
