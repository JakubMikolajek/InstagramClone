import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { colors } from "../../utils/globalStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "../../supabase/api/postApi";

interface LikeHeartProps {
  ownLike: any;
  id: number;
}

const LikeHeart = ({ ownLike, id }: LikeHeartProps) => {
  const client = useQueryClient();
  const addLikeMutation = useMutation({
    mutationFn: () => {
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
    mutationFn: () => {
      return deleteLike(ownLike.id);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });
  const addLike = () => addLikeMutation.mutate();
  const removeLike = () => removeLikeMutation.mutate();
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

const styles = StyleSheet.create({});
