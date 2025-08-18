import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 클라이언트 사이드용 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 서버 사이드용 Supabase 클라이언트 (관리자 권한)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// 데이터베이스 타입 정의
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'super_admin' | 'admin' | 'operator' | 'viewer'
          permissions: Record<string, boolean>
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'super_admin' | 'admin' | 'operator' | 'viewer'
          permissions?: Record<string, boolean>
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'super_admin' | 'admin' | 'operator' | 'viewer'
          permissions?: Record<string, boolean>
          is_active?: boolean
          updated_at?: string
        }
      }
      cruise_products: {
        Row: {
          id: number
          name: string
          description: string
          duration: string
          schedule: string
          adult_price: number
          child_price: number
          image_url: string
          is_popular: boolean
          rating: number
          review_count: number
          tags: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          duration: string
          schedule: string
          adult_price: number
          child_price: number
          image_url: string
          is_popular?: boolean
          rating?: number
          review_count?: number
          tags?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          duration?: string
          schedule?: string
          adult_price?: number
          child_price?: number
          image_url?: string
          is_popular?: boolean
          rating?: number
          review_count?: number
          tags?: string[]
          is_active?: boolean
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: number
          order_number: string
          user_id?: string
          customer_name: string
          customer_phone: string
          customer_email?: string
          product_id: number
          product_name: string
          product_image?: string
          reservation_date: string
          reservation_time: string
          adult_count: number
          child_count: number
          infant_count: number
          adult_price: number
          child_price: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
          payment_status: 'pending' | 'completed' | 'refunded' | 'failed'
          memo?: string
          created_at: string
          updated_at: string
          cancelled_at?: string
          cancel_reason?: string
        }
        Insert: {
          id?: number
          order_number: string
          user_id?: string
          customer_name: string
          customer_phone: string
          customer_email?: string
          product_id: number
          product_name: string
          product_image?: string
          reservation_date: string
          reservation_time: string
          adult_count: number
          child_count: number
          infant_count: number
          adult_price: number
          child_price: number
          total_amount: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
          payment_status?: 'pending' | 'completed' | 'refunded' | 'failed'
          memo?: string
          created_at?: string
          updated_at?: string
          cancelled_at?: string
          cancel_reason?: string
        }
        Update: {
          id?: number
          order_number?: string
          user_id?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string
          product_id?: number
          product_name?: string
          product_image?: string
          reservation_date?: string
          reservation_time?: string
          adult_count?: number
          child_count?: number
          infant_count?: number
          adult_price?: number
          child_price?: number
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show'
          payment_status?: 'pending' | 'completed' | 'refunded' | 'failed'
          memo?: string
          updated_at?: string
          cancelled_at?: string
          cancel_reason?: string
        }
      }
      notices: {
        Row: {
          id: number
          title: string
          content: string
          is_pinned: boolean
          is_active: boolean
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          is_pinned?: boolean
          is_active?: boolean
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          is_pinned?: boolean
          is_active?: boolean
          views?: number
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: number
          question: string
          answer: string
          category: string
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          question: string
          answer: string
          category: string
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          question?: string
          answer?: string
          category?: string
          order_index?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      qnas: {
        Row: {
          id: number
          title: string
          content: string
          author_name: string
          author_email?: string
          password?: string
          is_public: boolean
          is_answered: boolean
          answer?: string
          answered_at?: string
          answered_by?: string
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          author_name: string
          author_email?: string
          password?: string
          is_public?: boolean
          is_answered?: boolean
          answer?: string
          answered_at?: string
          answered_by?: string
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          author_name?: string
          author_email?: string
          password?: string
          is_public?: boolean
          is_answered?: boolean
          answer?: string
          answered_at?: string
          answered_by?: string
          views?: number
          updated_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: number
          title: string
          description?: string
          content?: string
          image_url: string
          author: string
          type: 'sns' | 'review'
          platform?: string
          cruise?: string
          rating?: number
          views: number
          likes: number
          comments: number
          shares?: number
          tags: string[]
          is_verified: boolean
          is_active: boolean
          is_pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string
          content?: string
          image_url: string
          author: string
          type: 'sns' | 'review'
          platform?: string
          cruise?: string
          rating?: number
          views?: number
          likes?: number
          comments?: number
          shares?: number
          tags?: string[]
          is_verified?: boolean
          is_active?: boolean
          is_pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          content?: string
          image_url?: string
          author?: string
          type?: 'sns' | 'review'
          platform?: string
          cruise?: string
          rating?: number
          views?: number
          likes?: number
          comments?: number
          shares?: number
          tags?: string[]
          is_verified?: boolean
          is_active?: boolean
          is_pinned?: boolean
          updated_at?: string
        }
      }
      system_settings: {
        Row: {
          id: number
          key: string
          value: string
          category: string
          description?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          key: string
          value: string
          category: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
          category?: string
          description?: string
          updated_at?: string
        }
      }
      popups: {
        Row: {
          id: number
          title: string
          content: string
          type: 'modal' | 'banner' | 'floating'
          position: 'center' | 'top' | 'bottom' | 'left' | 'right'
          width: number
          height: number
          background_color: string
          text_color: string
          border_width: number
          border_color: string
          border_radius: number
          show_delay: number
          auto_close_delay?: number
          start_date: string
          end_date: string
          target_pages: string[]
          priority: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          type?: 'modal' | 'banner' | 'floating'
          position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
          width?: number
          height?: number
          background_color?: string
          text_color?: string
          border_width?: number
          border_color?: string
          border_radius?: number
          show_delay?: number
          auto_close_delay?: number
          start_date: string
          end_date: string
          target_pages?: string[]
          priority?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          type?: 'modal' | 'banner' | 'floating'
          position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
          width?: number
          height?: number
          background_color?: string
          text_color?: string
          border_width?: number
          border_color?: string
          border_radius?: number
          show_delay?: number
          auto_close_delay?: number
          start_date?: string
          end_date?: string
          target_pages?: string[]
          priority?: number
          is_active?: boolean
          updated_at?: string
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
  }
}
