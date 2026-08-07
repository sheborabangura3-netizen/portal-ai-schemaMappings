export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AppDatabase = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      // "admin" also exists in this project (user_id, user_name, password) —
      // a custom login table, not Supabase Auth. Left out here since this
      // file only covers what the review page touches; it'll matter once
      // the Login page gets built against this same appDB.
      canonical_fields: {
        Row: {
          canonical_fields: Json | null
          type_of_canonical: string | null
        }
        Insert: {
          canonical_fields?: Json | null
          type_of_canonical?: string | null
        }
        Update: {
          canonical_fields?: Json | null
          type_of_canonical?: string | null
        }
        Relationships: []
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
