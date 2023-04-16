import React, { FC, useContext } from "react";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { AuthContext, AuthContextProps } from "../../../store/auth-context";
import AvatarAlt from "../../UI/AvatarAlt";

interface SingleUserProps {
  first_name: string;
  last_name: string;
  image_url: string;
  uuid: string;
}

const SingleUser: FC<SingleUserProps> = ({
  first_name,
  last_name,
  image_url,
  uuid,
}) => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
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
    <AvatarAlt
      first_name={first_name}
      last_name={last_name}
      image_url={image_url}
      onPress={goToUserProfileHandler}
    />
  );
};

export default SingleUser;
