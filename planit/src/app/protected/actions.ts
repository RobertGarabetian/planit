import { createClient } from "@/utils/supabase/server";


export default async function handler(id: any) {
    const supabase = createClient();

  const { data, error } = await supabase
    .from('auth.users')
    .select('raw_user_meta_data')
    .eq('id', id)

  if (error) {
    console.error(error)
  }

  return (data)
}