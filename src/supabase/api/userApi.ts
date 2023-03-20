import { supabaseClient } from "../supabase";

export const getAllUsers = async () =>
  await supabaseClient.from("users").select("*");

export const getUser = async (userId: string) =>
  await supabaseClient.from("users").select("*").eq("uuid", userId).single();

export const updateProfile = async (
  loggedUserId: string,
  firstName: string,
  lastName: string,
  imageUrl: string
) =>
  await supabaseClient
    .from("users")
    .update({
      uuid: loggedUserId,
      first_name: firstName,
      last_name: lastName,
      image_url: imageUrl,
    })
    .eq("uuid", loggedUserId);
