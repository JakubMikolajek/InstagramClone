import {Text} from 'react-native'
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
        users,
        isLoading: isLoadingUsers
    } = fetchAllUsersData("users", true)
    const {
        user,
        isLoading: isLoadingUser,
    } = fetchUserData("user", authCtx.loggedUserId, true)

    if (isLoadingUser && isLoadingUsers) {
        return <Loading/>
    }
    if (!user?.first_name && !user?.last_name && !user?.image_url) {
        return <EditUserDataScreen/>
    }

    console.log(users)

    return (
        <SafeAreaView>
            <Text>DashboardScreen</Text>
        </SafeAreaView>
    )
}

export default DashboardScreen

