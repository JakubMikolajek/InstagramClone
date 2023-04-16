import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { colors } from "../../utils/globalStyles";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createLike, deleteLike } from "../../supabase/api/postApi";

interface LikeHeartProps {
  ownLike: any;
  id: number;
}

const LikeHeart: FC<LikeHeartProps> = ({ ownLike, id }) => {
  const client: QueryClient = useQueryClient();
  const addLikeMutation = useMutation({
    mutationFn: (id: number) => {
      return createLike(id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });
  const removeLikeMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteLike(id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });
  const addLike = () => addLikeMutation.mutate(id);
  const removeLike = () => removeLikeMutation.mutate(ownLike.id);
  return (
    <TouchableOpacity onPress={ownLike ? removeLike : addLike}>
      <Icon
        name={ownLike ? "heart" : "heart-outline"}
        size={35}
        color={colors.lightBlue}
      />
    </TouchableOpacity>
  );
};

export default LikeHeart;
