import { supabase } from '@/lib/supabase';

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
  try {
    const { body } = await supabase.from('rooms').select('*');
    if (setState) setState(body);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Insert a new room into the DB
 * @param {object} room
 */
export const addRoom = async (room) => {
  try {
    const { body } = await supabase.from('rooms').insert([room]);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};
