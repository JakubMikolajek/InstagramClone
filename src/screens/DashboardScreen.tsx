import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, AuthContextProps } from "../store/auth-context";
import Loading from "../components/Loading";
import { fetchUserData } from "../hooks/fetchUserData";
import { fetchAllUsersData } from "../hooks/fetchAllUsersData";
import UsersList from "../components/usersComponents/userFlatList/UsersList";
import CustomBtn from "../components/UI/CustomBtn";
import { fetchAllPostsData } from "../hooks/fetchAllPostsData";
import PostsList from "../components/postsComponents/postFlatList/PostsList";
import { fetchUserPosts } from "../hooks/fetchUserPosts";
import { colors } from "../utils/globalStyles";

const DashboardScreen = ({ navigation }: any) => {
  const authCtx: AuthContextProps = useContext(AuthContext);

  const {
    user,
    isLoading: isLoadingUser,
    isRefetching: isRefetchingUser,
    refetch: refetchUser,
  } = fetchUserData(authCtx.loggedUserId, true);
  const {
    posts,
    isLoading: isLoadingPosts,
    isRefetching: isRefetchingPosts,
    refetch: refetchPosts,
  } = fetchAllPostsData(true);
  const {
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = fetchAllUsersData(true);
  const {
    isLoading: isLoadingUserPosts,
    isRefetching: isRefetchingUserPosts,
    refetch: refetchUserPosts,
  } = fetchUserPosts(authCtx.loggedUserId, true);

  if (isLoadingUser || isLoadingUsers || isLoadingPosts || isLoadingUserPosts) {
    return <Loading />;
  }
  if (!user?.first_name || !user?.last_name || !user?.image_url) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomBtn
          onPress={() =>
            navigation.navigate("UpdateOwnProfile", {
              name: "Name",
              surname: "Surname",
              imageUrl:
                "https://aqqnzwqssgqpxvwlqmpy.supabase.co/storage/v1/object/public/images/default/1678734936369e9b7b16c-18c1-44a9-8ba4-a8105c57dd93.png",
            })
          }
          title="Complete Your Profile"
          fontSize={14}
          color={colors.lightBlue}
        />
      </SafeAreaView>
    );
  }

  const isRefetching: boolean =
    isRefetchingUser ||
    isRefetchingUsers ||
    isRefetchingUserPosts ||
    isRefetchingPosts;

  const refetch = () => {
    refetchUser();
    refetchUsers();
    refetchPosts();
    refetchUserPosts;
  };

  return (
    <SafeAreaView style={styles.container}>
      <UsersList isRefetching={isRefetching} refetch={refetch} />
      <PostsList posts={posts} />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
