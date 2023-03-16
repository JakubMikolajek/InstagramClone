import {StyleSheet} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import Loading from "../components/Loading";
import {fetchUserData} from "../hooks/fetchUserData";
import {fetchAllUsersData} from "../hooks/fetchAllUsersData";
import UsersList from "../components/usersComponents/userFlatList/UsersList";
import CustomBtn from "../components/UI/CustomBtn";
import {fetchAllPostsData} from "../hooks/fetchAllPostsData";
import PostsList from "../components/postsComponents/postFlatList/PostsList";
import {fetchUserPosts} from "../hooks/fetchUserPosts";

const DashboardScreen = ({navigation}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)

    const {
        user,
        isLoading: isLoadingUser,
    } = fetchUserData(authCtx.loggedUserId, true)
    const {
        isLoading: isLoadingPosts
    } = fetchAllPostsData(true)
    const {
        isLoading: isLoadingUsers
    } = fetchAllUsersData(true)
    const {isLoading: isLoadingUserPosts}
        = fetchUserPosts(authCtx.loggedUserId, true)

    if (isLoadingUser || isLoadingUsers || isLoadingPosts || isLoadingUserPosts) {
        return <Loading/>
    }
    if (!user?.first_name || !user?.last_name || !user?.image_url) {
        return <SafeAreaView style={styles.container}>
            <CustomBtn onPress={() => navigation.navigate("UpdateOwnProfile", {
                name: "Name",
                surname: "Surname",
                imageUrl: "https://aqqnzwqssgqpxvwlqmpy.supabase.co/storage/v1/object/public/images/default/1678734936369e9b7b16c-18c1-44a9-8ba4-a8105c57dd93.png"
            })} title="Complete Your Profile" fontSize={14}/>
        </SafeAreaView>
    }

    return (
        <SafeAreaView style={styles.container}>
            <UsersList/>
            <PostsList/>
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

