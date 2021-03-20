import { supabaseAdmin } from '@/lib/initSupabaseAdmin';

export async function deleteAnonymousRoom(roomName) {
  const { data, error } = await supabaseAdmin
    .from('rooms')
    .delete()
    .eq('slug', roomName)
    .is('owner_id', null);

  if (error) throw error;

  return data;
}

export async function clearRoomMessages(roomName) {
  // Fetch room id by room name
  const { data: rooms, roomError } = await supabaseAdmin
    .from('rooms')
    .select('id')
    .eq('slug', roomName);

  if (roomError) throw roomError;

  const { data, error } = await supabaseAdmin
    .from('messages')
    .delete()
    .eq('room_id', rooms[0].id);

  if (error) throw error;

  return data;
}

export async function getUnlockedRoomBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .is('locked', false);

  if (error) throw error;

  return data[0];
}

export async function getMessagesByRoomId(roomId) {
  const { data: messages, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('room_id', roomId);

  if (error) throw error;

  return messages;
}

export async function createMessage(roomId, body) {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert([{ room_id: roomId, ...body }]);

  if (error) throw error;

  return data[0];
}
