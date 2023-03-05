import {client} from "../supabase";

export const getAllPosts = async () => await client
    .from("posts")
    .select("*")
    .is("archived_at", null)
    .order("id", {ascending: false})

export const getPost = async (postId: number) => await client
    .from("posts")
    .select("*")
    .eq("id", postId)
    .is("archived_at", null)
    .single()

export const createPost = async (description: string, imageUrl: string) => await client
    .from("posts")
    .insert({
        description: description,
        image_url: imageUrl
    })
    .limit(1)
    .single()

export const deletePost = async (postId: number) => await client
    .from("posts")
    .update({
        archived_at: new Date().toISOString()
    })
    .eq("id", postId)


export const createComment = async (postId: number, body: string) => await client
    .from("comments")
    .insert({
        body: body,
        post_id: postId
    })
    .limit(1)
    .single()

export const deleteComment = async (commentId: number) => await client
    .from("comments")
    .delete()
    .eq("id", commentId)

export const createLike = async (postId: number) => await client
    .from("likes")
    .insert({
        post_id: postId
    })
    .limit(1)
    .single()

export const deleteLike = async (likeId: number) => await client
    .from("likes")
    .delete()
    .eq("id", likeId)
