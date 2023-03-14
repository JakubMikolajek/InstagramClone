import {Image, StyleSheet, Text, View} from 'react-native'
import {screenWidth} from "../../../utils/dimension";
import {fetchAllUsersData} from "../../../hooks/fetchAllUsersData";
import Icon from "../../UI/Icon";
import {colors} from "../../../utils/globalStyles";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../../../store/auth-context";

const SinglePost = ({creatorId, id, imageUrl}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const {users} = fetchAllUsersData(false)
    const postOwner: any = users?.find((user) => user.uuid === creatorId)
    const ownPost: boolean = creatorId === authCtx.loggedUserId

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <View style={styles.userInnerContainer}>
                    <Image style={styles.userImage} source={{uri: postOwner.image_url}}/>
                    <Text>{postOwner.first_name} {postOwner.last_name}</Text>
                </View>
                <View>
                    {ownPost ? "" : <Icon name="heart-outline" size={35} color={colors.lightBlue}/>}
                </View>
            </View>
            <Image style={styles.image} source={{uri: imageUrl}}/>
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
        marginBottom:24
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
        height:50,
        justifyContent:"center",
        marginHorizontal:16
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
