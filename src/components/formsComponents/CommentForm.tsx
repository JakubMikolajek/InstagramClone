import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomBtn from "../UI/CustomBtn";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCommentValidation } from "../../utils/validation";
import InputController from "../UI/InputController";
import { createComment } from "../../supabase/api/postApi";
import { colors } from "../../utils/globalStyles";

const CommentForm = ({ id }: any) => {
  const client: QueryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createCommentValidation),
    defaultValues: {
      body: "",
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (data: any) => {
      return createComment(id, data.body);
    },
    onError: () => {
      console.log("Error");
    },
    onSuccess: async () => {
      await client.invalidateQueries(["posts", id]);
    },
  });

  const addComment = async (data: any) => {
    await addCommentMutation.mutate(data);
    await reset();
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <InputController
            control={control}
            errors={errors.body}
            placeholder=""
            name="body"
          />
          <CustomBtn
            onPress={handleSubmit((values) => addComment(values))}
            title="Add comment"
            fontSize={14}
            color={colors.lightBlue}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerContainer: {
    flex: 1,
  },
});
