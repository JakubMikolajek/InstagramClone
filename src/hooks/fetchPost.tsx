import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../supabase/api/postApi";

export const fetchPost = (post_id: number, enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch } = useQuery(
    ["posts", post_id],
    () => getSinglePost(post_id),
    { enabled: enabled }
  );
  const post = data;
  return { post, isLoading, isRefetching, refetch };
};
