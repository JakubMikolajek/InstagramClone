import {StyleSheet, View} from 'react-native'
import React, {useContext} from "react";
import {AuthContext, AuthContextProps} from "../../store/auth-context";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerValidation} from "../../utils/validation";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import {useNavigation} from "@react-navigation/native";

const RegisterForm = () => {
    const navigation: any = useNavigation()
    const authCtx: AuthContextProps = useContext(AuthContext)
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(registerValidation),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const register = (email: string, password: string) => {
        authCtx.register(email, password)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <InputController control={control} name="email" keyboardType="email-address" placeholder="Email:"
                                 errors={errors.email}/>
                <InputController control={control} name="password" secureTextEntry={true} placeholder="Password:"
                                 errors={errors.password}/>
                <InputController control={control} name="confirmPassword" secureTextEntry={true}
                                 placeholder="Confirm Password:"
                                 errors={errors.confirmPassword}/>
            </View>
            <CustomBtn onPress={handleSubmit((values) => register(values.email, values.password))}
                       title="Sign in" fontSize={18}/>
        </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 16
    },
    inputContainer: {
        marginBottom: 32
    },
    outerContainer: {
        flex: 1
    }
})
