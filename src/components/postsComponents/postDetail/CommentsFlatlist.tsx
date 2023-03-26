import React from "react";
import { FlatList } from "react-native";
import SingleComment from "./SingleComment";

const CommentsFlatlist = ({ comments }: any) => {
  const renderComments = (commentData: any) => {
    const comment = commentData.item;
    return <SingleComment comment={comment} />;
  };

  return (
    <FlatList
      data={comments}
      renderItem={renderComments}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CommentsFlatlist;
