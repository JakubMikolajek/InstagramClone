import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../supabase/api/postApi";
import { QueryProps } from "../types/types";

export const fetchPost = (id: number, enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch }: QueryProps = useQuery(
    ["posts", id],
    () => getSinglePost(id),
    { enabled: enabled }
  );
  const post = data;
  return { post, isLoading, isRefetching, refetch };
};
