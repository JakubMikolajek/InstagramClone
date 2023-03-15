import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {fetchAllUsersData} from "../hooks/fetchAllUsersData";
import Avatar from "../components/usersComponents/Avatar";
import {Database} from "../types/database";

const ProfileScreen = ({route}: any) => {
    const {users} = fetchAllUsersData(false)
    const user_id = route.params.uuid
    const user = users?.find((user) => user.uuid === user_id)

    const avatarProps = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        image_url: user?.image_url
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar {...avatarProps} pressable={false}/>
            </View>
            <View style={styles.postsContainer}>
                <Text>Test</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    avatarContainer:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },
    postsContainer:{
        flex:5
    }
})
