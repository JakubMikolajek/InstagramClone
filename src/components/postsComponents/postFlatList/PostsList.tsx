import {FlatList, StyleSheet, View} from 'react-native'
import {fetchAllPostsData} from "../../../hooks/fetchAllPostsData";
import SinglePost from "./SinglePost";

const PostsList = () => {
    const {
        posts
    } = fetchAllPostsData(false)

    const renderPost = (postData: any) => {
        const item = postData.item
        const postProps = {
            creator_uuid: item.creator_uuid,
            id: item.id,
            image_url: item.image_url
        }

        return <SinglePost {...postProps} />
    }

    return (
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item: any) => item.id} renderItem={renderPost}
                      showsVerticalScrollIndicator={false}/>
        </View>
    )
}

export default PostsList

const styles = StyleSheet.create({
    container: {
        flex: 6
    }
})
