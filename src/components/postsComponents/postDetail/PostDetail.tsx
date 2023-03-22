import React, { useContext } from "react";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "../../../utils/dimension";
import { fetchPost } from "../../../hooks/fetchPost";
import CommentsFlatlist from "./CommentsFlatlist";
import PostAvatar from "../../UI/PostAvatar";
import LikeHeart from "../../UI/LikeHeart";
import Icon from "../../UI/Icon";
import { colors } from "../../../utils/globalStyles";
import CommentForm from "../../formsComponents/CommentForm";

const PostDetail = ({ id }: any) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
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
        <Text style={styles.center}>Title: {postData.description}</Text>
        <View style={styles.flexRow}>
          <PostAvatar
            first_name={postOwner.first_name}
            last_name={postOwner.last_name}
            image_url={postOwner.image_url}
            pressable={false}
          />
          <View>
            {ownPost ? null : <LikeHeart ownLike={ownLike} id={id} />}
          </View>
        </View>
        <View style={styles.flexRowAlt}>
          <View style={styles.flexRowAlt}>
            <Icon name="heart" size={25} color={colors.lightBlue} />
            <Text>Likes: {postLikes.length}</Text>
          </View>
          <View style={styles.flexRowAlt}>
            <Icon name="chatbubble" size={25} color={colors.lightBlue} />
            <Text>Comments: {postComments.length}</Text>
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
        <View style={styles.commentFormContainer}>
          <CommentForm id={id} />
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
});
