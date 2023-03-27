import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext, AuthContextProps } from "../../store/auth-context";
import InputController from "../UI/InputController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../utils/validation";
import CustomBtn from "../UI/CustomBtn";
import { colors } from "../../utils/globalStyles";

const LoginForm = () => {
  const authCtx: AuthContextProps = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (email: string, password: string) => {
    await authCtx.login(email, password);
    await reset();
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
      </View>
      <CustomBtn
        onPress={handleSubmit((values) => login(values.email, values.password))}
        title="Sign up"
        fontSize={18}
        color={colors.lightBlue}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
  inputContainer: {
    marginBottom: 32,
  },
});
