import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {colors} from "../../../utils/globalStyles";

interface SingleUserProps {
    onPress: () => void
    name: string
    surname: string
    imageUrl: string
}

const SingleUser = ({onPress, name, surname, imageUrl}: SingleUserProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{uri: imageUrl}} style={styles.image}/>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{surname}</Text>
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
