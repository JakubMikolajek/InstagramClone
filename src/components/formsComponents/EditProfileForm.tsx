import React, { FC, useContext, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileValidation } from "../../utils/validation";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateProfile } from "../../supabase/api/userApi";
import { AuthContext, AuthContextProps } from "../../store/auth-context";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabaseClient } from "../../supabase/supabase";
import { colors } from "../../utils/globalStyles";

interface EditProfileFormProps {
  refetch: any;
  route: any;
}

const EditProfileForm: FC<EditProfileFormProps> = ({ refetch, route }) => {
  const [url, setUrl] = useState<string>(route.params?.imageUrl);
  const [update, setUpdate] = useState<boolean>(false);
  const authCtx: AuthContextProps = useContext(AuthContext);
  const client: QueryClient = useQueryClient();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editProfileValidation),
    defaultValues: {
      name: route.params?.name ? route.params?.name : "",
      surname: route.params?.surname ? route.params?.surname : "",
    },
  });

  const uploadImage = async (image: any, userId: any) => {
    const imageId: string = Date.now().toString() + userId;
    await supabaseClient.storage
      .from("images")
      .upload(`${userId}/${imageId}.png`, decode(image), {
        contentType: "image/png",
      });
    const { data } = supabaseClient.storage
      .from("images")
      .getPublicUrl(`${userId}/${imageId}.png`);
    setUrl(data?.publicUrl);
  };

  const pickImage = async () => {
    setUpdate(true);
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!res.canceled) {
      await uploadImage(res.assets[0].base64, authCtx.loggedUserId);
      setUpdate(false);
    }
    setUpdate(false);
  };

  const updateDataMutation = useMutation({
    mutationFn: (data: any) => {
      return updateProfile(authCtx.loggedUserId, data.name, data.surname, url);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["user", authCtx.loggedUserId]);
      await client.invalidateQueries(["users"]);
      refetch();
      navigation.goBack();
    },
  });

  const editProfile = async (data: any) => {
    await updateDataMutation.mutate(data);
    await reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={{ uri: url }} />
        <InputController
          control={control}
          errors={errors.name}
          placeholder="Name:"
          name="name"
        />
        <InputController
          control={control}
          errors={errors.surname}
          placeholder="Surname"
          name="surname"
        />
      </View>

      {update ? (
        <Text>Sending your photo. Please wait...</Text>
      ) : (
        <View>
          <CustomBtn
            onPress={handleSubmit((values: FieldValues) => editProfile(values))}
            title="Save"
            fontSize={18}
            margin={4}
            color={colors.lightBlue}
          />
          <CustomBtn
            onPress={pickImage}
            title="Pick Image"
            fontSize={14}
            margin={4}
            color={colors.lightBlue}
          />
        </View>
      )}
    </View>
  );
};

export default EditProfileForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  image: {
    borderColor: colors.lightBlue,
    borderRadius: 75,
    borderWidth: 2,
    height: 125,
    width: 125,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
});
