import {FlatList, StyleSheet, View} from 'react-native'
import {fetchUserPosts} from "../../../hooks/fetchUserPosts";
import Loading from "../../Loading";
import SingleGridPost from "./SingleGridPost";
import {screenWidth} from "../../../utils/dimension";

interface PostGridListProps {
    user_id: string
    enabled: boolean
}

const PostGridList = ({user_id, enabled}: PostGridListProps) => {
    const {posts, isLoading} = fetchUserPosts(user_id, enabled)

    if (isLoading) {
        return <Loading/>
    }

    const renderGridPost = (postData: any) => {
        const post = postData.item
        const postProps = {
            id: post.id,
            image_url: post.image_url
        }
        return <SingleGridPost {...postProps}/>
    }

    return (
        <View style={styles.flatList}>
            <FlatList data={posts} keyExtractor={(item: any) => item.id} renderItem={renderGridPost} numColumns={3}/>
        </View>
    )
}

export default PostGridList

const styles = StyleSheet.create({
    flatList: {
        width: screenWidth,
        justifyContent: "flex-start"

    }
})
