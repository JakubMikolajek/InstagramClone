import {StyleSheet, View, Image, Text} from 'react-native'
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {editProfileValidation} from "../../utils/validation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProfile} from "../../supabase/api/userApi";
import {useContext, useState} from "react";
import {AuthContext, AuthContextProps} from "../../store/auth-context";
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"
import {decode} from "base64-arraybuffer";
import {supabaseClient} from "../../supabase/supabase";
import {colors} from "../../utils/globalStyles";

const EditProfileForm = ({refetch, route}: any) => {
    const [url, setUrl] = useState<any>(route.params?.imageUrl)
    const [update, setUpdate] = useState<boolean>(false)
    const authCtx: AuthContextProps = useContext(AuthContext)
    const client = useQueryClient()
    const navigation: any = useNavigation()
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(editProfileValidation),
        defaultValues: {
            name: route.params?.name ? route.params?.name : "",
            surname: route.params?.surname ? route.params?.surname : ""
        }
    })

    const uploadImage = async (image: any, userId: any) => {
        const imageId = Date.now().toString() + userId
        await supabaseClient.storage.from("images").upload(`${userId}/${imageId}.png`, decode(image), {
            contentType: 'image/png'
        })
        const {data} = supabaseClient.storage.from("images").getPublicUrl(`${userId}/${imageId}.png`)
        setUrl(data?.publicUrl)
    }

    const pickImage = async () => {
        setUpdate(true)
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
            base64: true,
        })

        if (!res.canceled) {
            await uploadImage(res.assets[0].base64, authCtx.loggedUserId)
            setUpdate(false)
        }
        setUpdate(false)
    }

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return updateProfile(authCtx.loggedUserId, data.name, data.surname, url)
        },
        onError: () => {
            console.log("Error")
        },
        onSuccess: async () => {
            await client.invalidateQueries(["user", authCtx.loggedUserId])
            await client.invalidateQueries(["users"])
            refetch()
            navigation.goBack()
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={{uri: route.params.imageUrl}}/>
                <InputController control={control} errors={errors.name} placeholder="Name:" name="name"/>
                <InputController control={control} errors={errors.surname} placeholder="Surname" name="surname"/>
            </View>

            {update ? <Text>Sending your photo. Please wait...</Text> :
                <View>
                    <CustomBtn onPress={handleSubmit((values) => mutation.mutate(values))} title="Save"
                               fontSize={18}
                               margin={4}/>
                    <CustomBtn onPress={pickImage} title="Pick Image" fontSize={14} margin={4}/>
                </View>}
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
        marginBottom: 32,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 75,
        borderColor: colors.lightBlue,
        borderWidth: 2
    }
})
