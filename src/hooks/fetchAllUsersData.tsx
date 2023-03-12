import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../supabase/api/userApi";

export const fetchAllUsersData = (queryKey: string, enabled: boolean) => {
    const {
        isLoading,
        data,
        isRefetching,
        refetch
    } = useQuery([`${queryKey}`], () => getAllUsers(), {enabled: enabled})
    const users = data?.data

    return {users, isLoading, isRefetching, refetch}
}
