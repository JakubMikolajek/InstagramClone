import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>SearchScreen</Text>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
