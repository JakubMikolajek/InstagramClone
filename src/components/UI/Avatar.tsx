import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/globalStyles";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

interface AvatarProps {
  first_name: string;
  last_name: string;
  image_url: string;
  pressable: boolean;
}

const Avatar = ({
  first_name,
  last_name,
  image_url,
  pressable,
}: AvatarProps) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View style={styles.container}>
      {pressable ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UpdateOwnProfile", {
              name: first_name,
              surname: last_name,
              imageUrl: image_url,
            })
          }
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: image_url }}
          />
        </TouchableOpacity>
      ) : (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: image_url }}
        />
      )}
      <Text style={styles.text}>
        {first_name} {last_name}
      </Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderColor: colors.lightBlue,
    borderRadius: 75,
    borderWidth: 2,
    height: 125,
    width: 125,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
});
