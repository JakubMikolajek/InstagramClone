import React, { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SinglePost from "./SinglePost";
import { RenderPostProps } from "../../../types/types";

interface PostsListProps {
  posts: any;
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  const renderPost = (postData: any) => {
    const item: any = postData.item;
    const postProps: RenderPostProps = {
      id: item.id,
    };

    return <SinglePost {...postProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PostsList;

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
});
