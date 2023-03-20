import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SinglePost from "./SinglePost";

interface PostsListProps {
  posts: any;
}

const PostsList = ({ posts }: PostsListProps) => {
  const renderPost = (postData: any) => {
    const item = postData.item;
    const postProps = {
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
