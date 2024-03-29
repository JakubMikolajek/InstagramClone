import React, { FC, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAllUsersData } from "../hooks/fetchAllUsersData";
import Avatar from "../components/UI/Avatar";
import PostGridList from "../components/postsComponents/postGridList/PostGridList";
import { fetchUserPosts } from "../hooks/fetchUserPosts";
import Loading from "../components/Loading";
import PostsList from "../components/postsComponents/postFlatList/PostsList";
import { AvatarProps } from "../types/types";

interface ProfileScreenProps {
  route: any;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ route }) => {
  const [enable, setEnable] = useState<boolean>(false);
  const toggleSwitch = () => setEnable((prevState: boolean) => !prevState);
  const user_id: string = route.params.uuid;
  const { users } = fetchAllUsersData(false);
  const { posts, isLoading } = fetchUserPosts(user_id, true);
  const user = users?.find((user: any) => user.uuid === user_id);

  if (isLoading) {
    return <Loading />;
  }

  const avatarProps: AvatarProps = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    image_url: user?.image_url,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar {...avatarProps} pressable={false} />
      </View>
      <View style={styles.postsContainer}>
        <Switch onValueChange={toggleSwitch} value={enable} />
        {enable ? <PostsList posts={posts} /> : <PostGridList posts={posts} />}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    flex: 3,
    justifyContent: "center",
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
