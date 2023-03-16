import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import Avatar from "../components/usersComponents/Avatar";
import {fetchUserData} from "../hooks/fetchUserData";
import PostGridList from "../components/postsComponents/postGridList/PostGridList";

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
            <View style={styles.avatarContainer}>
                <Avatar {...avatarProps} pressable={true}/>
                <CustomBtn onPress={() => authCtx.logout()} title="Logout" fontSize={16}/>
            </View>
            <View style={styles.postsContainer}>
                <PostGridList user_id={authCtx.loggedUserId} enabled={false}/>
            </View>
        </SafeAreaView>
    )
}

export default OwnProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    avatarContainer: {
        flex: 3
    },
    postsContainer: {
        flex: 6
    }
})
