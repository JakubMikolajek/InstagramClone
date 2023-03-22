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

export const getAllUserPosts = async (userId: string) =>
  await supabaseClient
    .from("posts")
    .select("*")
    .eq("creator_uuid", userId)
    .is("archived_at", null)
    .order("id", { ascending: false });

export const createPost = async (description: string, imageUrl: string) =>
  await supabaseClient
    .from("posts")
    .insert({
      description: description,
      image_url: imageUrl,
    })
    .limit(1)
    .single();

export const deletePost = async (postId: number) =>
  await supabaseClient
    .from("posts")
    .update({
      archived_at: new Date().toISOString(),
    })
    .eq("id", postId);

export const createComment = async (postId: number, body: string) =>
  await supabaseClient
    .from("comments")
    .insert({
      body: body,
      post_id: postId,
    })
    .limit(1)
    .single();

export const deleteComment = async (commentId: number) =>
  await supabaseClient.from("comments").delete().eq("id", commentId);

export const createLike = async (postId: number) =>
  await supabaseClient
    .from("likes")
    .insert({
      post_id: postId,
    })
    .limit(1)
    .single();

export const deleteLike = async (likeId: number) =>
  await supabaseClient.from("likes").delete().eq("id", likeId);
