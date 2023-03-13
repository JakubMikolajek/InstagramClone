import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import {colors} from "../../utils/globalStyles";
import {useNavigation} from "@react-navigation/native";

interface AvatarProps {
    name: string | undefined | null
    surname: string | undefined | null
    imageUrl: string | undefined | null
    pressable: boolean
}

const Avatar = ({name, surname, imageUrl, pressable}: AvatarProps) => {
    const navigation: any = useNavigation()
    return (
        <View style={styles.container}>
            {pressable ? <Pressable onPress={() => navigation.navigate("UpdateOwnProfile", {
                name: name,
                surname: surname,
                imageUrl: imageUrl
            })}>
                <Image style={styles.image} resizeMode="contain"
                       source={imageUrl ? {uri: imageUrl} : require("../../../assets/userAvatarImage.png")}/>
            </Pressable> : <Image style={styles.image} resizeMode="contain"
                                  source={imageUrl ? {uri: imageUrl} : require("../../../assets/userAvatarImage.png")}/>}
            <Text style={styles.text}>{name ? name : "Name"} {surname ? surname : "Surname"}</Text>
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
