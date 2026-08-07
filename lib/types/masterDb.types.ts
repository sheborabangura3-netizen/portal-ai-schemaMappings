export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type MasterDatabase = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          environment: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          environment?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          environment?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "institutions"
            referencedColumns: ["user_id"]
          },
        ]
      }
      institution_schema_mappings: {
        Row: {
          created_at: string
          discovered_at: string | null
          discovered_schema: Json | null
          field_mappings: Json
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          discovered_at?: string | null
          discovered_schema?: Json | null
          field_mappings?: Json
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          discovered_at?: string | null
          discovered_schema?: Json | null
          field_mappings?: Json
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_schema_mappings_new_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "institutions"
            referencedColumns: ["user_id"]
          },
        ]
      }
      institutions: {
        Row: {
          country: string
          created_at: string
          environment: string | null
          institution_name: string
          institution_type: string
          portal_type: string
          status: string
          updated_at: string
          user_email: string
          user_id: string
        }
        Insert: {
          country?: string
          created_at?: string
          environment?: string | null
          institution_name: string
          institution_type?: string
          portal_type?: string
          status?: string
          updated_at?: string
          user_email?: string
          user_id: string
        }
        Update: {
          country?: string
          created_at?: string
          environment?: string | null
          institution_name?: string
          institution_type?: string
          portal_type?: string
          status?: string
          updated_at?: string
          user_email?: string
          user_id?: string
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

/*
 * Trimmed to the tables this app actually touches (institution_schema_mappings,
 * institutions) plus api_keys since it's part of the same public schema and
 * costs nothing to keep typed. Re-sync from the dashboard repo's generated
 * types if the master DB schema changes — this file is hand-copied, not
 * auto-generated here.
 */