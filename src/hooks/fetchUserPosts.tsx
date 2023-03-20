import { useQuery } from "@tanstack/react-query";
import { getAllUserPosts } from "../supabase/api/postApi";

export const fetchUserPosts = (userId: string, enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch } = useQuery(
    ["posts", userId],
    () => getAllUserPosts(userId),
    { enabled: enabled }
  );
  const posts = data?.data;

  return { posts, isLoading, isRefetching, refetch };
};
