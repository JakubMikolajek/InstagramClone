import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import LoginForm from "../components/formsComponents/LoginForm";
import Header from "../components/UI/Header";

const LoginScreen = ({navigation}: any) => {

    return (
        <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <Header title="Login"/>
                    <LoginForm/>
                    <CustomBtn onPress={() => navigation.navigate("Register")} title="Register" fontSize={14}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    outerContainer: {
        flex: 1
    }
})
