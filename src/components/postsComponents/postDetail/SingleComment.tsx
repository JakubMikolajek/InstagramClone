import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { fetchUserData } from "../../../hooks/fetchUserData";

const SingleComment = ({ comment }: any) => {
  const { user, isLoading }: any = fetchUserData(comment.creator_uuid, true);
  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user?.image_url }} />
      <Text>{user?.first_name}: </Text>
      <Text>{comment.body}</Text>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },
  image: {
    borderRadius: 16,
    height: 25,
    width: 25,
  },
});
