import {StyleSheet, View} from 'react-native'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editProfileValidation} from "../../utils/validation";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProfile} from "../../supabase/api/userApi";
import {useContext} from "react";
import {AuthContext, AuthContextProps} from "../../store/auth-context";
import {useNavigation} from "@react-navigation/native";

const EditProfileForm = ({emptyUser, refetch}: any) => {
    const authCtx: AuthContextProps = useContext(AuthContext)
    const client = useQueryClient()
    const navigation = useNavigation()
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(editProfileValidation),
        defaultValues: {
            name: "",
            surname: "",
            imageUrl: ""
        }
    })

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return updateProfile(authCtx.loggedUserId, data.name, data.surname, data.imageUrl)
        },
        onError: () => {
            console.log("Error")
        },
        onSuccess: async () => {
            await client.invalidateQueries(["user", authCtx.loggedUserId])
            refetch()
            if (!emptyUser) {
                navigation.goBack()
            }
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <InputController control={control} errors={errors.name} placeholder="Name:" name="name"/>
                <InputController control={control} errors={errors.surname} placeholder="Surname" name="surname"/>
                <InputController control={control} errors={errors.imageUrl} placeholder="ImageUrl:" name="imageUrl"/>
            </View>
            <CustomBtn onPress={handleSubmit((values) => mutation.mutate(values))} title="Save" fontSize={18}/>
        </View>
    )
}

export default EditProfileForm

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 16
    },
    inputContainer: {
        marginBottom: 32
    }
})
