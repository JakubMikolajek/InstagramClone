import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SingleGridPost from "./SingleGridPost";
import { screenWidth } from "../../../utils/dimension";

interface PostGridListProps {
  posts: any;
}

const PostGridList = ({ posts }: PostGridListProps) => {
  const renderGridPost = (postData: any) => (
    <SingleGridPost id={postData.item.id} />
  );

  return (
    <View style={styles.flatList}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={renderGridPost}
        numColumns={3}
      />
    </View>
  );
};

export default PostGridList;

const styles = StyleSheet.create({
  flatList: {
    justifyContent: "flex-start",
    width: screenWidth,
  },
});
