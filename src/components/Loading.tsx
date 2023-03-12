import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {colors} from "../utils/globalStyles";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.lightBlue}/>
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 14
    }
})
