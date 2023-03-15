import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenWidth} from "../../../utils/dimension";
import {fetchAllUsersData} from "../../../hooks/fetchAllUsersData";
import Icon from "../../UI/Icon";
import {colors} from "../../../utils/globalStyles";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../../../store/auth-context";
import {useNavigation} from "@react-navigation/native";

const SinglePost = ({creator_uuid, id, image_url}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const navigation: any = useNavigation()
    const {users} = fetchAllUsersData(false)
    const postOwner: any = users?.find((user) => user.uuid === creator_uuid)
    const ownPost: boolean = creator_uuid === authCtx.loggedUserId

    const goToPostDetailsHandler = () => {
        navigation.navigate("PostDetail", {
            id: id
        })
    }

    const goToUserProfileHandler = () => {
        navigation.navigate("Profile", {
            uuid: postOwner.uuid
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <TouchableOpacity style={styles.userInnerContainer} onPress={goToUserProfileHandler}>
                    <Image style={styles.userImage} source={{uri: postOwner.image_url}}/>
                    <Text>{postOwner.first_name} {postOwner.last_name}</Text>
                </TouchableOpacity>
                <View>
                    {ownPost ? "" : <Icon name="heart-outline" size={35} color={colors.lightBlue}/>}
                </View>
            </View>
            <TouchableOpacity onPress={goToPostDetailsHandler}>
                <Image style={styles.image} source={{uri: image_url}}/>
            </TouchableOpacity>
            <View style={styles.commentContainer}>
                <Text>No one has commented this post yet</Text>
            </View>
        </View>
    )
}

export default SinglePost

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        marginBottom: 24
    },
    userContainer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 8,
        marginVertical: 4,
    },
    userInnerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    commentContainer: {
        height: 50,
        justifyContent: "center",
        marginHorizontal: 16
    },
    image: {
        alignSelf: "center",
        width: screenWidth,
        height: screenWidth,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})
