import React, { useContext } from "react";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../../UI/Icon";
import { colors } from "../../../utils/globalStyles";
import { screenWidth } from "../../../utils/dimension";
import { fetchPost } from "../../../hooks/fetchPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "../../../supabase/api/postApi";
import CommentsFlatlist from "./CommentsFlatlist";

const PostDetail = ({ id }: any) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const client = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: () => {
      return createLike(id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: () => {
      return deleteLike(ownLike.id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });

  const addLike = () => addLikeMutation.mutate();
  const removeLike = () => removeLikeMutation.mutate();

  const { post }: any = fetchPost(id, false);
  const { users } = fetchAllUsersData(false);
  const postData = post?.data;
  const postLikes = postData.likes;
  const postComments = postData.comments;
  const postOwner: any = users?.find(
    (user: any) => user.uuid === postData.creator_uuid
  );
  const ownPost: boolean = postData.creator_uuid === authCtx.loggedUserId;
  const ownLike = postLikes.find(
    (like: any) => like.creator_uuid === authCtx.loggedUserId
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: postData.image_url }} />
      </View>
      <View style={styles.postDetailContainer}>
        <View>
          <Text style={styles.center}>Title: {postData.description}</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.userContainer}>
            <Image
              style={styles.userImage}
              source={{ uri: postOwner.image_url }}
            />
            <Text>
              {postOwner.first_name} {postOwner.last_name}
            </Text>
          </View>
          <View>
            {ownPost ? null : (
              <TouchableOpacity onPress={ownLike ? removeLike : addLike}>
                <Icon
                  name={ownLike ? "heart" : "heart-outline"}
                  size={35}
                  color={colors.lightBlue}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.commentsContainer}>
          {!postComments.length ? (
            <Text style={styles.center}>
              No one has commented this post yet
            </Text>
          ) : (
            <CommentsFlatlist comments={postComments} />
          )}
        </View>
        <View>
          <Button title="Test" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  center: {
    alignSelf: "center",
  },
  commentsContainer: {},
  container: {
    flex: 1,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  image: {
    height: screenWidth,
    width: screenWidth,
  },
  imageContainer: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
  },
  postDetailContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  userImage: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
});
