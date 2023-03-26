import { useQuery } from "@tanstack/react-query";
import { getUser } from "../supabase/api/userApi";
import { QueryProps } from "../types/types";

export const fetchUserData = (uuid: string, enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch }: QueryProps = useQuery(
    ["user", uuid],
    () => getUser(uuid),
    { enabled: enabled }
  );
  const user = data?.data;

  return { user, isLoading, isRefetching, refetch };
};
