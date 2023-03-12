import {client} from "../supabase";

export const getAllUsers = async () => await client
    .from("users")
    .select("*")

export const getUser = async (userId: string) => await client
    .from("users")
    .select("*")
    .eq("uuid", userId)
    .single()

export const updateProfile = async (loggedUserId: string, firstName: string, lastName: string, imageUrl: string) => await client
    .from("users")
    .update({
        uuid: loggedUserId,
        first_name: firstName,
        last_name: lastName,
        image_url: imageUrl
    })
    .eq("uuid", loggedUserId)
