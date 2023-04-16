import React, { FC } from "react";
import CustomBtn from "./CustomBtn";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost } from "../../supabase/api/postApi";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { colors } from "../../utils/globalStyles";

interface DeletePostBtnProps {
  id: number;
}

const DeletePostBtn: FC<DeletePostBtnProps> = ({ id }) => {
  const postId: number = id;
  const client: QueryClient = useQueryClient();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const removePostMutation = useMutation({
    mutationFn: (id: number) => {
      return deletePost(id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts"]);
      navigation.goBack();
    },
  });
  const removePost = () => removePostMutation.mutate(postId);
  return (
    <CustomBtn
      onPress={removePost}
      title="Delete post"
      fontSize={14}
      color={colors.red}
    />
  );
};

export default DeletePostBtn;
