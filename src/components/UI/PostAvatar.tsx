import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PostAvatarProps {
  first_name: string;
  last_name: string;
  image_url: string;
  onPress?: () => void;
  pressable: boolean;
}

const PostAvatar = ({
  first_name,
  last_name,
  image_url,
  onPress,
  pressable,
}: PostAvatarProps) => {
  return (
    <View>
      {pressable ? (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image style={styles.image} source={{ uri: image_url }} />
          <Text>
            {first_name} {last_name}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: image_url }} />
          <Text>
            {first_name} {last_name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PostAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
});
