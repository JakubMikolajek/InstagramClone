import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../components/UI/Header";
import {fetchUserData} from "../hooks/fetchUserData";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import EditProfileForm from "../components/formsComponents/EditProfileForm";

const EditUserDataScreen = ({route}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const {user, refetch} = fetchUserData(authCtx.loggedUserId, false)

    const emptyUser = !user?.first_name || !user?.last_name || !user?.image_url

    return (
        <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <Header title={emptyUser ? "Complete Your Profile" : "Edit Your Profile"}/>
                    <EditProfileForm route={route} refetch={refetch} emptyUser={emptyUser}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default EditUserDataScreen

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

