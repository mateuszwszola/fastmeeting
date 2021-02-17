import { supabase } from '@/lib/initSupabase';
import { slugify } from '@/utils/helpers';

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUser = async (userId, setState) => {
  try {
    const { body } = await supabase.from('users').eq('id', userId).select(`*`);
    const user = body[0];
    if (setState) setState(user);
    return user;
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Fetch all rooms
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchRooms = async (setState) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('id', true);

  if (error) throw error;
  if (setState) setState(data);
  return data;
};

/**
 * Fetch user rooms
 * @param {string} userId
 */
export const fetchUserRooms = async (userId) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('owner_id', userId)
    .order('id', true);

  if (error) throw error;
  return data;
};

/**
 * Insert a new room into the DB
 * @param {string} roomName
 * @param {string} ownerId
 */
export const addRoom = async (roomName, ownerId) => {
  const { data, error } = await supabase.from('rooms').insert([
    {
      name: roomName,
      slug: slugify(roomName),
      owner_id: ownerId,
    },
  ]);

  if (error) throw error;
  return data[0];
};

/**
 * Delete a room
 * @param {number} roomId
 */
export const deleteRoom = async (roomId) => {
  const { data, error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', roomId);

  if (error) throw error;
  return data[0];
};
