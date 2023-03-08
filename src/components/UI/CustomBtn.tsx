import {StyleSheet, Text, TouchableOpacity,} from 'react-native'

interface ButtonProps {
    onPress: () => void,
    title: string,
    fontSize: number
}

const CustomBtn = ({onPress, title, fontSize}: ButtonProps) => {
    const size = {
        fontSize: fontSize
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={[styles.text, size]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomBtn

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#63b8df",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center"
    }
})
