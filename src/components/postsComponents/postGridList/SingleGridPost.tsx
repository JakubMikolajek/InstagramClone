import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {screenWidth} from "../../../utils/dimension";
import {useNavigation} from "@react-navigation/native";

interface SingleGridProps {
    id: string
    image_url: string
}

const SingleGridPost = ({id, image_url}: SingleGridProps) => {
    const navigation: any = useNavigation()
    const goToPostDetail = () => {
        navigation.navigate("PostDetail", {
            id: id
        })
    }


    return (
        <TouchableOpacity style={styles.container} onPress={goToPostDetail}>
            <Image style={styles.image} source={{uri: image_url}}/>
        </TouchableOpacity>
    )
}

export default SingleGridPost

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 3,
        height: screenWidth / 3
    },
    image: {
        width: screenWidth / 3,
        height: screenWidth / 3
    }
})
