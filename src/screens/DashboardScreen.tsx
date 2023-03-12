import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import Loading from "../components/Loading";
import EditUserDataScreen from "./EditUserDataScreen";
import {fetchUserData} from "../hooks/fetchUserData";
import {fetchAllUsersData} from "../hooks/fetchAllUsersData";

const DashboardScreen = () => {
    const authCtx: AuthContextProps = useContext(AuthContext)

    const {
        user,
        isLoading: isLoadingUser,
    } = fetchUserData("user", authCtx.loggedUserId, true)
    const {
        users,
        isLoading: isLoadingUsers
    } = fetchAllUsersData("users", true)

    if (isLoadingUser || isLoadingUsers) {
        return <Loading/>
    }
    if (!user?.first_name || !user?.last_name || !user?.image_url) {
        return <EditUserDataScreen/>
    }

    console.log(users)

    return (
        <SafeAreaView style={styles.container}>
            <Text>DashboardScreen</Text>
        </SafeAreaView>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

