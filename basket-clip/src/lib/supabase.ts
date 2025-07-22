import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// プレースホルダー値を使用（実際のSupabaseプロジェクト作成後に置き換え）
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key')

export type ClipData = {
  id?: string
  username: string
  video_url: string
  play_type: string
  memo: string
  created_at?: string
  updated_at?: string
}