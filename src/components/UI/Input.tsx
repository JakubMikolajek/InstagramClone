import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native'
import {screenWidth} from "../../utils/dimension";
import {colors} from "../../utils/globalStyles";

interface InputProps {
    placeholder: string
    onBlur: () => void | undefined
    onChange: () => void | undefined
    value: string | undefined
    keyboardType: KeyboardTypeOptions | undefined
    secureTextEntry: boolean | undefined
    errors: any
}

const Input = ({placeholder, onBlur, onChange, value, keyboardType, secureTextEntry, errors}: InputProps) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, errors && styles.textInvalid]}>{placeholder}</Text>
            <TextInput
                style={[styles.input, errors && styles.inputInvalid]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.75,
        height: 70,
        justifyContent: "center",
        margin: 4

    },
    text: {
        color: colors.black
    },
    textInvalid: {
        color: colors.red
    },
    input: {
        borderWidth: 1,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        width: screenWidth * 0.75,
        height: 40,
        paddingHorizontal: 4,
        fontSize: 20
    },
    inputInvalid: {
        borderColor: colors.red
    }
})
