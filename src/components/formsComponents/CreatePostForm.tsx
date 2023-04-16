import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostValidation } from "../../utils/validation";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import { createPost } from "../../supabase/api/postApi";
import { colors } from "../../utils/globalStyles";
import * as ImagePicker from "expo-image-picker";
import { AuthContext, AuthContextProps } from "../../store/auth-context";
import { supabaseClient } from "../../supabase/supabase";
import { decode } from "base64-arraybuffer";

const CreatePostForm = () => {
  const [url, setUrl] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const authCtx: AuthContextProps = useContext(AuthContext);
  const client: QueryClient = useQueryClient();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createPostValidation),
    defaultValues: {
      description: "",
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

  //Not working on Samsung S21FE and other phones with Android 13 or newer in futures
  const takePhoto = async () => {
    if (status && !status.granted) {
      await requestPermission();
    }
    let res = await ImagePicker.launchCameraAsync({
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

  const createPostMutation = useMutation({
    mutationFn: (data: any) => {
      return createPost(data.description, url);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts"]);
      navigation.navigate("OwnProfile");
    },
  });

  const addPost = async (data: any) => {
    await createPostMutation.mutate(data);
    await reset();
    await setUrl("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {url ? (
          <Image style={styles.image} source={{ uri: url }} />
        ) : (
          <View style={styles.imageContainer}>
            <Text>You can see your photo here</Text>
          </View>
        )}
        <InputController
          control={control}
          errors={errors.description}
          placeholder="Title:"
          name="description"
        />
        {update ? null : (
          <View style={styles.btnContainer}>
            <CustomBtn
              onPress={pickImage}
              title="Pick photo"
              fontSize={14}
              color={colors.lightBlue}
            />
            <CustomBtn
              onPress={takePhoto}
              title="Take photo"
              fontSize={14}
              color={colors.lightBlue}
            />
          </View>
        )}
      </View>
      {update ? (
        <Text>Sending your photo. Please wait...</Text>
      ) : (
        <CustomBtn
          onPress={handleSubmit((values: FieldValues) => addPost(values))}
          title="Create Post"
          fontSize={18}
          color={colors.lightBlue}
        />
      )}
    </View>
  );
};

export default CreatePostForm;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 250,
  },
  container: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  image: {
    height: 250,
    width: 250,
  },
  imageContainer: {
    alignItems: "center",
    borderColor: colors.lightBlue,
    borderWidth: 2,
    height: 250,
    justifyContent: "center",
    width: 250,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
});
