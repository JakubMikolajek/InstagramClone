import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { fetchUserData } from "../../../hooks/fetchUserData";
import Icon from "../../UI/Icon";
import { colors } from "../../../utils/globalStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../../supabase/api/postApi";

const SingleComment = ({ comment }: any) => {
  const client = useQueryClient();
  const { user, isLoading }: any = fetchUserData(comment.creator_uuid, true);
  if (isLoading) {
    return null;
  }

  const deleteCommentMutation = useMutation({
    mutationFn: () => {
      return deleteComment(comment.id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", comment.post_id]);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Image style={styles.image} source={{ uri: user?.image_url }} />
        <Text>{user?.first_name}: </Text>
        <Text>{comment.body}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteCommentMutation.mutate()}>
        <Icon name="trash-outline" size={20} color={colors.red} />
      </TouchableOpacity>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  commentContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  image: {
    borderRadius: 16,
    height: 25,
    width: 25,
  },
});
