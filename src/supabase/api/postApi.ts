import { supabaseClient } from "../supabase";

export const getAllPosts = async () =>
  await supabaseClient
    .from("posts")
    .select("*")
    .is("archived_at", null)
    .order("id", { ascending: false });

export const getSinglePost = async (id: number) =>
  await supabaseClient
    .from("posts")
    .select(
      "id, creator_uuid, description, image_url, likes(post_id, creator_uuid, id), comments ( body, creator_uuid, id, post_id )"
    )
    .eq("id", id)
    .single();

export const getAllUserPosts = async (creator_uuid: string) =>
  await supabaseClient
    .from("posts")
    .select("*")
    .eq("creator_uuid", creator_uuid)
    .is("archived_at", null)
    .order("id", { ascending: false });

export const createPost = async (description: string, image_url: string) =>
  await supabaseClient
    .from("posts")
    .insert({
      description: description,
      image_url: image_url,
    })
    .limit(1)
    .single();

export const deletePost = async (id: number) =>
  await supabaseClient
    .from("posts")
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq("id", id);

export const createComment = async (post_id: number, body: string) =>
  await supabaseClient
    .from("comments")
    .insert({
      body: body,
      post_id: post_id,
    })
    .limit(1)
    .single();

export const deleteComment = async (id: number) =>
  await supabaseClient.from("comments").delete().eq("id", id);

export const createLike = async (post_id: number) =>
  await supabaseClient
    .from("likes")
    .insert({
      post_id: post_id,
    })
    .limit(1)
    .single();

export const deleteLike = async (id: number) =>
  await supabaseClient.from("likes").delete().eq("id", id);
