import { useQuery } from "@tanstack/react-query";
import { getAllUserPosts } from "../supabase/api/postApi";
import { QueryProps } from "../types/types";

export const fetchUserPosts = (creator_uuid: string, enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch }: QueryProps = useQuery(
    ["posts", creator_uuid],
    () => getAllUserPosts(creator_uuid),
    { enabled: enabled }
  );
  const posts = data?.data;

  return { posts, isLoading, isRefetching, refetch };
};
