import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../components/UI/Header";
import RegisterForm from "../components/formsComponents/RegisterForm";

const RegisterScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <Header title="Register"/>
                    <RegisterForm/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
