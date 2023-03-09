import {StyleSheet, View} from 'react-native'
import {AuthContext, AuthContextTypes} from "../../store/auth-context";
import {useContext} from "react";
import InputController from "../UI/InputController";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginValidation} from "../../utils/validation";
import CustomBtn from "../UI/CustomBtn";

const LoginForm = () => {
    const authCtx: AuthContextTypes = useContext(AuthContext)
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginValidation),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <InputController control={control} name="email" keyboardType="email-address" placeholder="Email:"
                                 errors={errors.email} />
                <InputController control={control} name="password" secureTextEntry={true} placeholder="Password:"
                                 errors={errors.password}/>
            </View>
            <CustomBtn onPress={handleSubmit((values) => authCtx.login(values.email, values.password))}
                       title="Sign up" fontSize={18}/>
        </View>
    )
}

export default LoginForm

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
