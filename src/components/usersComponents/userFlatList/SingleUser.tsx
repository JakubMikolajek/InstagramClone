import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";

interface SingleUserProps {
  first_name: string;
  last_name: string;
  image_url: string;
  uuid: string;
}

const SingleUser = ({
  first_name,
  last_name,
  image_url,
  uuid,
}: SingleUserProps) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const navigation: any = useNavigation();
  const goToUserProfileHandler = () => {
    if (authCtx.loggedUserId === uuid) {
      navigation.navigate("OwnProfile");
    } else {
      navigation.navigate("Profile", {
        uuid: uuid,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToUserProfileHandler}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.text}>{first_name}</Text>
      <Text style={styles.text}>{last_name}</Text>
    </TouchableOpacity>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: 70,
  },
  image: {
    borderColor: colors.lightBlue,
    borderRadius: 50,
    borderWidth: 2,
    height: 60,
    width: 60,
  },
  text: {
    fontSize: 11,
  },
});
