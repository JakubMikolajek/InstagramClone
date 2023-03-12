import {useQuery} from "@tanstack/react-query";
import {getUser} from "../supabase/api/userApi";

export const fetchUserData = (queryKey: string, userId: string, enabled: boolean) => {
    const {
        isLoading,
        data,
        isRefetching,
        refetch
    } = useQuery([`${queryKey}`], () => getUser(userId), {enabled: enabled})
    const user = data?.data

    return {user, isLoading, isRefetching, refetch}
}
