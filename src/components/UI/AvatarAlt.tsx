import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/globalStyles";

interface AvatarAltProps {
  first_name: string;
  last_name: string;
  image_url: string;
  onPress: () => void;
}

const AvatarAlt = ({
  first_name,
  last_name,
  image_url,
  onPress,
}: AvatarAltProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.text}>{first_name}</Text>
      <Text style={styles.text}>{last_name}</Text>
    </TouchableOpacity>
  );
};

export default AvatarAlt;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: 70,
  },
  image: {
    borderColor: colors.lightBlue,
    borderRadius: 50,
    borderWidth: 2,
    height: 60,
    width: 60,
  },
  text: {
    fontSize: 11,
  },
});
