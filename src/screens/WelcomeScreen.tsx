import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";


const WelcomeScreen = ({navigation}: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>WelcomeScreen</Text>
            <CustomBtn onPress={() => navigation.replace("Login")} fontSize={16} title="Start your journey"/>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",

    },
    text:{
        fontSize: 24,
        color:"#63b8df",
        fontWeight:"500",
        marginBottom:24
    }
})
