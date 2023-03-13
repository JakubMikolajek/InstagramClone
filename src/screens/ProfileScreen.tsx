import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>ProfileScreen</Text>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
