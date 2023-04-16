import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { screenWidth } from "../../../utils/dimension";

interface SingleGridPostAltProps {
  id: number;
  image_url: string;
}

const SingleGridPostAlt: FC<SingleGridPostAltProps> = ({ id, image_url }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const goToPostDetail = () => {
    navigation.navigate("PostDetail", {
      id: id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToPostDetail}>
      <Image style={styles.image} source={{ uri: image_url }} />
    </TouchableOpacity>
  );
};

export default SingleGridPostAlt;

const styles = StyleSheet.create({
  container: {
    height: screenWidth / 3,
    width: screenWidth / 3,
  },
  image: {
    height: screenWidth / 3,
    width: screenWidth / 3,
  },
});
