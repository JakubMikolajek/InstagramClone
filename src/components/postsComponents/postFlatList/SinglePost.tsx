import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { screenWidth } from "../../../utils/dimension";
import { fetchPost } from "../../../hooks/fetchPost";
import PostAvatar from "../../UI/PostAvatar";
import LikeHeart from "../../UI/LikeHeart";

interface SinglePostProps {
  id: number;
}

const SinglePost = ({ id }: SinglePostProps) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const { post, isLoading } = fetchPost(id, true);
  const { users } = fetchAllUsersData(false);
  if (isLoading) {
    return null;
  }

  const postData: any = post?.data;
  const postLikes: any = postData.likes;
  const lastComment: any = postData.comments[postData.comments.length - 1];

  const postOwner: any = users?.find(
    (user: any) => user.uuid === postData.creator_uuid
  );
  const ownPost: boolean = postData.creator_uuid === authCtx.loggedUserId;
  const countLikes: number = postLikes.length;
  const ownLike: any = postLikes.find(
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
        <PostAvatar
          first_name={postOwner.first_name}
          last_name={postOwner.last_name}
          image_url={postOwner.image_url}
          onPress={goToUserProfileHandler}
          pressable={true}
        />
        {ownPost ? null : <LikeHeart ownLike={ownLike} id={id} />}
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
});
