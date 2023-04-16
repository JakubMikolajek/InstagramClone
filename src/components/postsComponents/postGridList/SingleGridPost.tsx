import React, { FC } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { screenWidth } from "../../../utils/dimension";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { fetchPost } from "../../../hooks/fetchPost";

interface SingleGridProps {
  id: number;
}

const SingleGridPost: FC<SingleGridProps> = ({ id }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { post, isLoading } = fetchPost(id, true);

  if (isLoading) {
    return null;
  }

  const postData: any = post?.data;

  const goToPostDetail = () => {
    navigation.navigate("PostDetail", {
      id: id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToPostDetail}>
      <Image style={styles.image} source={{ uri: postData.image_url }} />
    </TouchableOpacity>
  );
};

export default SingleGridPost;

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
