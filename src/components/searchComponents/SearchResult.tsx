import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { fetchAllUsersData } from "../../hooks/fetchAllUsersData";
import { fetchAllPostsData } from "../../hooks/fetchAllPostsData";
import PostAvatar from "../UI/PostAvatar";
import SingleGridPostAlt from "../postsComponents/postGridList/SingleGridPostAlt";

interface UserProps {
  first_name: string;
  last_name: string;
  image_url: string;
}

interface PostProps {
  id: number;
  image_url: string;
}

const SearchResult = () => {
  const [search, setSearch] = useState<string>("");
  const { users } = fetchAllUsersData(false);
  const { posts } = fetchAllPostsData(false);

  const resultUsers = users.filter((user: any) =>
    [user.first_name, user.last_name]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const resultPosts = posts.filter((post: any) =>
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderUserResults = (userData: any) => {
    const user: any = userData.item;
    const userProps: UserProps = {
      first_name: user.first_name,
      last_name: user.last_name,
      image_url: user.image_url,
    };
    return <PostAvatar {...userProps} pressable={false} />;
  };

  const renderPostResults = (postData: any) => {
    const post: any = postData.item;
    const postProps: PostProps = {
      id: post.id,
      image_url: post.image_url,
    };
    return <SingleGridPostAlt {...postProps} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="Search here"
          onChangeText={(e: string) => setSearch(e)}
        />
      </View>
      <View style={styles.listContainer}>
        {search === "" ? (
          <Text style={styles.centerText}>
            Nothing here, search something...
          </Text>
        ) : (
          <View>
            <Text style={styles.boldText}>Users:</Text>
            {resultUsers.length === 0 && (
              <Text style={styles.centerText}>
                We couldn't find a username with your search term.
              </Text>
            )}
            <FlatList
              style={styles.userList}
              data={resultUsers}
              keyExtractor={(user: any) => user.uuid}
              renderItem={renderUserResults}
            />
            <Text style={styles.boldText}>Posts:</Text>
            {resultPosts.length === 0 && (
              <Text style={styles.centerText}>
                We couldn't find a post with your search term.
              </Text>
            )}
            <FlatList
              numColumns={3}
              data={resultPosts}
              keyExtractor={(post: any) => post.id}
              renderItem={renderPostResults}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  boldText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  centerText: {
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  input: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  listContainer: {
    flex: 8,
  },
  userList: {
    marginHorizontal: 8,
  },
});
