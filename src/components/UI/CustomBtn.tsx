import {StyleSheet, Text, TouchableOpacity,} from 'react-native'
import {colors} from "../../utils/globalStyles";

interface ButtonProps {
    onPress: () => void,
    title: string,
    fontSize: number,
    margin?: number
}

const CustomBtn = ({onPress, title, fontSize, margin}: ButtonProps) => {
    const font = {
        fontSize: fontSize,
    }
    const style = {
        margin: margin
    }

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={[styles.text, font]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomBtn

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    text: {
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center"
    }
})
