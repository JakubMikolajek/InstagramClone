import React, { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext, AuthContextProps } from "../../store/auth-context";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../utils/validation";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { colors } from "../../utils/globalStyles";

const RegisterForm: FC = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const authCtx: AuthContextProps = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = async (email: string, password: string) => {
    await authCtx.register(email, password);
    await reset();
    await navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputController
          control={control}
          name="email"
          keyboardType="email-address"
          placeholder="Email:"
          errors={errors.email}
        />
        <InputController
          control={control}
          name="password"
          secureTextEntry={true}
          placeholder="Password:"
          errors={errors.password}
        />
        <InputController
          control={control}
          name="confirmPassword"
          secureTextEntry={true}
          placeholder="Confirm Password:"
          errors={errors.confirmPassword}
        />
      </View>
      <CustomBtn
        onPress={handleSubmit((values: FieldValues) =>
          register(values.email, values.password)
        )}
        title="Sign in"
        fontSize={18}
        color={colors.lightBlue}
      />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  inputContainer: {
    marginBottom: 32,
  },
});
