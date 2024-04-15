import { supabase } from '@/config/supabaseClient'

export const getAllProducts = async () => {
  const { data, error } = await supabase.from('menuCoffe').select()

  if (error) throw error
  return data
}
