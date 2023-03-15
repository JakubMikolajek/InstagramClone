import {StyleSheet} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import Avatar from "../components/usersComponents/Avatar";
import {fetchUserData} from "../hooks/fetchUserData";

const OwnProfileScreen = () => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const {
        user,
    } = fetchUserData(authCtx.loggedUserId, false)

    const loggedUser = user

    const avatarProps = {
        first_name: loggedUser?.first_name,
        last_name: loggedUser?.last_name,
        image_url: loggedUser?.image_url
    }

    return (
        <SafeAreaView style={styles.container}>
            <Avatar {...avatarProps} pressable={true}/>
            <CustomBtn onPress={() => authCtx.logout()} title="Logout" fontSize={16}/>
        </SafeAreaView>
    )
}

export default OwnProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
