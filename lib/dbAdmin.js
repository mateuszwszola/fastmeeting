import { supabaseAdmin } from '@/lib/initSupabaseAdmin';

export const deleteAnonymousRoom = async (roomName) => {
  const { data, error } = await supabaseAdmin
    .from('rooms')
    .delete()
    .eq('slug', roomName)
    .is('owner_id', null);

  if (error) throw error;

  return data;
};
