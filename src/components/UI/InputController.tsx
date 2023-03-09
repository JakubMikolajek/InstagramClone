import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native'
import {Controller} from "react-hook-form";
import Input from "./Input";
import {screenWidth} from "../../utils/dimension";
import {colors} from "../../utils/globalStyles";

interface InputControllerProps {
    control: any
    errors: any
    placeholder: string
    name: string
    keyboardType?: KeyboardTypeOptions | undefined
    secureTextEntry?: boolean | undefined

}

const InputController = ({control, errors, placeholder, name, keyboardType, secureTextEntry}: InputControllerProps) => {
    return (
        <View style={styles.container}>
            <Controller control={control} render={({field: {onChange, onBlur, value}}) => (
                <Input onChange={onChange} onBlur={onBlur} value={value} placeholder={placeholder}
                       keyboardType={keyboardType} secureTextEntry={secureTextEntry} errors={errors}/>
            )} name={name}/>
            <View style={styles.errorContainer}>
                {errors && <Text style={styles.errorMessage}>{errors?.message}</Text>}
            </View>
        </View>
    )
}

export default InputController

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.75,
        justifyContent: "center",
        alignItems: "center"
    },
    errorContainer: {
        padding: 0,
        alignSelf: "flex-start"
    },
    errorMessage: {
        color: colors.red
    }
})
