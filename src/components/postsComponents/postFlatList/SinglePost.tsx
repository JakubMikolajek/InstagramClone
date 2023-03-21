import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "../../../supabase/api/postApi";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../UI/Icon";
import { screenWidth } from "../../../utils/dimension";
import { colors } from "../../../utils/globalStyles";
import { fetchPost } from "../../../hooks/fetchPost";

const SinglePost = ({ id }: any) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const navigation: any = useNavigation();
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

  const { post, isLoading }: any = fetchPost(id, true);
  const { users }: any = fetchAllUsersData(false);
  if (isLoading) {
    return null;
  }

  const postData = post?.data;
  const postLikes = postData.likes;
  const lastComment = postData.comments[postData.comments.length - 1];

  const postOwner: any = users?.find(
    (user: any) => user.uuid === postData.creator_uuid
  );
  const ownPost: boolean = postData.creator_uuid === authCtx.loggedUserId;
  const countLikes = postLikes.length;
  const ownLike = postLikes.find(
    (like: any) => like.creator_uuid === authCtx.loggedUserId
  );

  const goToPostDetailsHandler = () => {
    navigation.navigate("PostDetail", {
      id: id,
    });
  };

  const goToUserProfileHandler = () => {
    navigation.navigate("Profile", {
      uuid: postOwner.uuid,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <TouchableOpacity
          style={styles.userInnerContainer}
          onPress={goToUserProfileHandler}
        >
          <Image
            style={styles.userImage}
            source={{ uri: postOwner.image_url }}
          />
          <Text>
            {postOwner.first_name} {postOwner.last_name}
          </Text>
        </TouchableOpacity>
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
      <TouchableOpacity onPress={goToPostDetailsHandler}>
        <Image style={styles.image} source={{ uri: postData.image_url }} />
      </TouchableOpacity>
      <View style={styles.commentContainer}>
        <Text>Title: {postData.description}</Text>
        <Text>Likes: {countLikes}</Text>
        <Text>
          {!lastComment
            ? "Last comment: No one has commented this post yet"
            : `Last comment: ${lastComment.body}`}
        </Text>
      </View>
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  commentContainer: {
    height: 100,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  container: {
    marginBottom: 24,
    width: screenWidth,
  },
  image: {
    alignSelf: "center",
    height: screenWidth,
    width: screenWidth,
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  userImage: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  userInnerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
});
