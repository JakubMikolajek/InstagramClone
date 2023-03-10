import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomBtn from "../components/UI/CustomBtn";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../store/auth-context";

const OwnProfileScreen = () => {
    const authCtx:AuthContextProps = useContext(AuthContext)
    return (
        <SafeAreaView style={styles.container}>
            <Text>OwnProfileScreen</Text>
            <CustomBtn onPress={() => authCtx.logout()} title="Logout" fontSize={16}/>
        </SafeAreaView>
    )
}

export default OwnProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
