import {StyleSheet, View} from 'react-native'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigation} from "@react-navigation/native";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createPostValidation} from "../../utils/validation";
import InputController from "../UI/InputController";
import CustomBtn from "../UI/CustomBtn";
import {createPost} from "../../supabase/api/postApi";

const CreatePostForm = () => {
    const client = useQueryClient()
    const navigation: any = useNavigation()
    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(createPostValidation),
        defaultValues: {
            description: "",
            imgUrl: ""
        }
    })

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return createPost(data.description, data.imgUrl)
        },
        onError: () => {
            console.log("Error")
        },
        onSuccess: async () => {
            await client.invalidateQueries(["posts"])

            navigation.navigate("OwnProfile")
        }
    })


    return (
        <View>
            <View>
                <InputController control={control} errors={errors.description} placeholder="Title:" name="description"/>
                <InputController control={control} errors={errors.imgUrl} placeholder="ImgUrl" name="imgUrl"/>
            </View>
            <CustomBtn onPress={handleSubmit((values) => mutation.mutate(values))}
                       title="Create Post" fontSize={18}/>
        </View>
    )
}

export default CreatePostForm

const styles = StyleSheet.create({})
