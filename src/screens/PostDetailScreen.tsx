import React from "react";
import PostDetail from "../components/postsComponents/postDetail/PostDetail";

const PostDetailScreen = ({ route }: any) => {
  const postId = route.params.id;

  return <PostDetail id={postId} />;
};

export default PostDetailScreen;
