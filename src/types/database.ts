export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          body: string | null
          created_at: string | null
          creator_uuid: string
          id: number
          post_id: number
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          creator_uuid?: string
          id?: number
          post_id: number
        }
        Update: {
          body?: string | null
          created_at?: string | null
          creator_uuid?: string
          id?: number
          post_id?: number
        }
      }
      likes: {
        Row: {
          created_at: string | null
          creator_uuid: string
          id: number
          post_id: number
        }
        Insert: {
          created_at?: string | null
          creator_uuid?: string
          id?: number
          post_id: number
        }
        Update: {
          created_at?: string | null
          creator_uuid?: string
          id?: number
          post_id?: number
        }
      }
      posts: {
        Row: {
          archived_at: string | null
          created_at: string | null
          creator_uuid: string
          description: string | null
          id: number
          image_url: string | null
        }
        Insert: {
          archived_at?: string | null
          created_at?: string | null
          creator_uuid?: string
          description?: string | null
          id?: number
          image_url?: string | null
        }
        Update: {
          archived_at?: string | null
          created_at?: string | null
          creator_uuid?: string
          description?: string | null
          id?: number
          image_url?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          first_name: string | null
          image_url: string | null
          last_name: string | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          image_url?: string | null
          last_name?: string | null
          uuid: string
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          image_url?: string | null
          last_name?: string | null
          uuid?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
