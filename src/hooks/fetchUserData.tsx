import {useQuery} from "@tanstack/react-query";
import {getUser} from "../supabase/api/userApi";

export const fetchUserData = (userId: string, enabled: boolean) => {
    const {
        isLoading,
        data,
        isRefetching,
        refetch
    } = useQuery(["user", userId], () => getUser(userId), {enabled: enabled})
    const user = data?.data

    return {user, isLoading, isRefetching, refetch}
}
