import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../supabase/api/postApi";
import { QueryProps } from "../types/types";

export const fetchAllPostsData = (enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch }: QueryProps = useQuery(
    ["posts"],
    () => getAllPosts(),
    { enabled: enabled }
  );
  const posts = data?.data;

  return { posts, isLoading, isRefetching, refetch };
};
