import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

const PostDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>PostDetailScreen</Text>
        </SafeAreaView>
    )
}

export default PostDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})
