import { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface QueryProps {
  isLoading: boolean;
  data: PostgrestSingleResponse<any> | undefined;
  isRefetching: boolean;
  refetch: any;
}

export interface AvatarProps {
  first_name: string;
  last_name: string;
  image_url: string;
}

export interface RenderPostProps {
  id: number;
}
