import React, { FC } from "react";
import { FlatList } from "react-native";
import SingleComment from "./SingleComment";

interface CommentsFlatlistProps {
  comments: any;
}

const CommentsFlatlist: FC<CommentsFlatlistProps> = ({ comments }) => {
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
