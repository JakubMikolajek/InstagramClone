import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SingleGridPost from "./SingleGridPost";
import { screenWidth } from "../../../utils/dimension";
import { RenderPostProps } from "../../../types/types";

interface PostGridListProps {
  posts: any;
}

const PostGridList = ({ posts }: PostGridListProps) => {
  const renderGridPost = (postData: any) => {
    const item: any = postData.item;
    const postProps: RenderPostProps = {
      id: item.id,
    };
    return <SingleGridPost {...postProps} />;
  };

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
