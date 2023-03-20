import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { fetchAllUsersData } from "../../../hooks/fetchAllUsersData";
import SingleUser from "./SingleUser";
import { AuthContext } from "../../../store/auth-context";
import { colors } from "../../../utils/globalStyles";
import { screenWidth } from "../../../utils/dimension";

const UsersList = () => {
  const authCtx = useContext(AuthContext);
  const { users } = fetchAllUsersData(true);

  users?.forEach((user, i) => {
    if (user.uuid === authCtx.loggedUserId) {
      users?.splice(i, 1);
      users?.unshift(user);
    }
  });

  const renderUser = (userData: any) => {
    const item = userData.item;
    const userProps = {
      first_name: item.first_name,
      last_name: item.last_name,
      image_url: item.image_url,
      uuid: item.uuid,
    };
    return <SingleUser {...userProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item: any) => item.uuid}
        renderItem={renderUser}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flex: 1,
    width: screenWidth,
  },
});
