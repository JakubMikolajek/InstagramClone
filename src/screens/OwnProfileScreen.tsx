import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import { AuthContext, AuthContextProps } from "../store/auth-context";
import Avatar from "../components/UI/Avatar";
import { fetchUserData } from "../hooks/fetchUserData";
import PostGridList from "../components/postsComponents/postGridList/PostGridList";
import { fetchUserPosts } from "../hooks/fetchUserPosts";
import { AvatarProps } from "../types/types";
import { colors } from "../utils/globalStyles";

const OwnProfileScreen = () => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const { user } = fetchUserData(authCtx.loggedUserId, false);
  const { posts } = fetchUserPosts(authCtx.loggedUserId, false);
  const loggedUser = user;

  const avatarProps: AvatarProps = {
    first_name: loggedUser?.first_name,
    last_name: loggedUser?.last_name,
    image_url: loggedUser?.image_url,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar {...avatarProps} pressable={true} />
        <CustomBtn
          onPress={() => authCtx.logout()}
          title="Logout"
          fontSize={16}
          color={colors.lightBlue}
        />
      </View>
      <View style={styles.postsContainer}>
        <PostGridList posts={posts} />
      </View>
    </SafeAreaView>
  );
};

export default OwnProfileScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 3,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  postsContainer: {
    flex: 6,
  },
});
