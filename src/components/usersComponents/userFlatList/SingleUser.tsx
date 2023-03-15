import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {colors} from "../../../utils/globalStyles";
import {useNavigation} from "@react-navigation/native";

interface SingleUserProps {
    first_name: string
    last_name: string
    image_url: string
    uuid: string
}

const SingleUser = ({first_name, last_name, image_url, uuid}: SingleUserProps) => {
    const navigation: any = useNavigation()
    const goToUserProfileHandler = () => {
        navigation.navigate("Profile", {
            uuid: uuid
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToUserProfileHandler}>
            <Image source={{uri: image_url}} style={styles.image}/>
            <Text style={styles.text}>{first_name}</Text>
            <Text style={styles.text}>{last_name}</Text>
        </TouchableOpacity>
    )
}

export default SingleUser

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: colors.lightBlue,
        borderWidth: 2

    },
    text: {
        fontSize: 11
    }
})
