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
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState) => {
    try {
        const { body } = await supabase.from('channels').select('*');
        if (setState) setState(body);
        return body;
    } catch (error) {
        console.log('error', error);
    }
};

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 */
export const addChannel = async (slug) => {
    try {
        const { body } = await supabase.from('channels').insert([{ slug }]);
        return body;
    } catch (error) {
        console.log('error', error);
    }
};

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId, setState) => {
    try {
        const { body } = await supabase
            .from('messages')
            .select(`*, author:user_id(*)`)
            .eq('channel_id', channelId)
            .order('inserted_at', true);
        if (setState) setState(body);
        return body;
    } catch (error) {
        console.log('error', error);
    }
};

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (message, channel_id, user_id) => {
    try {
        const { body } = await supabase.from('messages').insert([{ message, channel_id, user_id }]);
        return body;
    } catch (error) {
        console.log('error', error);
    }
};
