import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {fetchAllPostsData} from "../hooks/fetchAllPostsData";
import {screenWidth} from "../utils/dimension";
import {fetchAllUsersData} from "../hooks/fetchAllUsersData";
import Icon from "../components/UI/Icon";
import {colors} from "../utils/globalStyles";
import {AuthContext, AuthContextProps} from "../store/auth-context";
import {useContext} from "react";

const PostDetailScreen = ({route}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const {posts} = fetchAllPostsData(false)
    const {users} = fetchAllUsersData(false)
    const postId = route.params.id
    const post: any = posts?.find((post) => post.id === postId)
    const postCreator = post.creator_uuid
    const postOwner: any = users?.find((user) => user.uuid === postCreator)
    const ownPost: boolean = postCreator === authCtx.loggedUserId

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: post?.image_url}}/>
            </View>
            <View style={styles.postDetailContainer}>
                <View style={styles.flexRow}>
                    <View style={styles.userContainer}>
                        <Image style={styles.userImage} source={{uri: postOwner.image_url}}/>
                        <Text>{postOwner.first_name} {postOwner.last_name}</Text>
                    </View>
                    <View>
                        {ownPost ? "" : <Icon name="heart-outline" size={35} color={colors.lightBlue}/>}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        width: screenWidth,
        height: screenWidth
    },
    image: {
        width: screenWidth,
        height: screenWidth
    },
    postDetailContainer: {
        flex: 1,
        justifyContent: "flex-start"
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        height: 50,
        marginHorizontal: 8,
        marginVertical: 4,
    }

})
