import React, { useContext } from "react";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import { Image, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "../../../utils/dimension";
import { fetchPost } from "../../../hooks/fetchPost";
import CommentsFlatlist from "./CommentsFlatlist";
import PostAvatar from "../../UI/PostAvatar";
import LikeHeart from "../../UI/LikeHeart";
import Icon from "../../UI/Icon";
import { colors } from "../../../utils/globalStyles";
import CommentForm from "../../formsComponents/CommentForm";
import DeletePostBtn from "../../UI/DeletePostBtn";

interface PostDetailProps {
  id: number;
}

const PostDetail = ({ id }: PostDetailProps) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const { post } = fetchPost(id, false);
  const { users } = fetchAllUsersData(false);
  const postData: any = post?.data;
  const postLikes: any = postData.likes;
  const postComments: any = postData.comments;
  const postOwner: any = users?.find(
    (user: any) => user.uuid === postData.creator_uuid
  );
  const ownPost: boolean = postData.creator_uuid === authCtx.loggedUserId;
  const ownLike: any = postLikes.find(
    (like: any) => like.creator_uuid === authCtx.loggedUserId
  );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: postData.image_url }} />
      <View style={styles.postDetailContainer}>
        <Text style={styles.center}>Title: {postData.description}</Text>
        <View style={styles.flexRow}>
          <PostAvatar
            first_name={postOwner.first_name}
            last_name={postOwner.last_name}
            image_url={postOwner.image_url}
            pressable={false}
          />
          {ownPost ? (
            <DeletePostBtn id={id} />
          ) : (
            <LikeHeart ownLike={ownLike} id={id} />
          )}
        </View>
        <View style={styles.flexRowAlt}>
          <Icon name="heart" size={25} color={colors.lightBlue} />
          <Text>Likes: {postLikes.length}</Text>
          <Icon name="chatbubble" size={25} color={colors.lightBlue} />
          <Text>Comments: {postComments.length}</Text>
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
        <View style={styles.commentFormContainer}>
          <CommentForm id={id} />
        </View>
      </View>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  center: {
    alignSelf: "center",
  },
  commentFormContainer: { flex: 3 },
  commentsContainer: { flex: 3 },
  container: {
    flex: 1,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 50,
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  flexRowAlt: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
  },
  postDetailContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
