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
    } = fetchUserData("user", authCtx.loggedUserId, false)

    const loggedUser = user

    return (
        <SafeAreaView style={styles.container}>
            <Avatar name={loggedUser?.first_name} surname={loggedUser?.last_name} imageUrl={loggedUser?.image_url}
                    pressable={true}/>
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
