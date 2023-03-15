import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {colors} from "../../utils/globalStyles";
import {useNavigation} from "@react-navigation/native";

interface AvatarProps {
    first_name: string | undefined | null
    last_name: string | undefined | null
    image_url: string | undefined | null
    pressable: boolean
}

const Avatar = ({first_name, last_name, image_url, pressable}: AvatarProps) => {
    const navigation: any = useNavigation()
    return (
        <View style={styles.container}>
            {pressable ? <TouchableOpacity onPress={() => navigation.navigate("UpdateOwnProfile", {
                name: first_name,
                surname: last_name,
                imageUrl: image_url
            })}>
                <Image style={styles.image} resizeMode="contain"
                       source={image_url ? {uri: image_url} : require("../../../assets/userAvatarImage.png")}/>
            </TouchableOpacity> : <Image style={styles.image} resizeMode="contain"
                                  source={image_url ? {uri: image_url} : require("../../../assets/userAvatarImage.png")}/>}
            <Text style={styles.text}>{first_name ? first_name : "Name"} {last_name ? last_name : "Surname"}</Text>
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 75,
        borderColor: colors.lightBlue,
        borderWidth: 2
    },
    text: {
        fontSize: 20,
        fontWeight: "500"
    }
})
