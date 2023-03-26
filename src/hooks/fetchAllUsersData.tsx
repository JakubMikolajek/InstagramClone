import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../supabase/api/userApi";
import { QueryProps } from "../types/types";

export const fetchAllUsersData = (enabled: boolean) => {
  const { isLoading, data, isRefetching, refetch }: QueryProps = useQuery(
    ["users"],
    () => getAllUsers(),
    { enabled: enabled }
  );
  const users = data?.data;
  return { users, isLoading, isRefetching, refetch };
};
