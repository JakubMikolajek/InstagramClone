import React, { FC, useContext } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { fetchUserData } from "../../../hooks/fetchUserData";
import Icon from "../../UI/Icon";
import { colors } from "../../../utils/globalStyles";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment } from "../../../supabase/api/postApi";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";

interface SingleCommentProps {
  comment: any;
}

const SingleComment: FC<SingleCommentProps> = ({ comment }) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const client: QueryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteComment(id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", comment.post_id]);
    },
  });

  const { user, isLoading } = fetchUserData(comment.creator_uuid, true);
  if (isLoading) {
    return null;
  }
  const postId: number = comment.id;
  const ownComment = comment.creator_uuid === authCtx.loggedUserId;

  const removeComment = () => deleteCommentMutation.mutate(postId);

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <Image style={styles.image} source={{ uri: user?.image_url }} />
        <Text>{user?.first_name}: </Text>
        <Text>{comment.body}</Text>
      </View>
      {ownComment ? (
        <TouchableOpacity onPress={removeComment}>
          <Icon name="trash-outline" size={20} color={colors.red} />
        </TouchableOpacity>
      ) : null}
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
