import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { fetchChannels, fetchMessages, fetchUser } from '@/lib/db';

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = ({ channelId }) => {
    const [channels, setChannels] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users] = useState(new Map());
    const [newMessage, handleNewMessage] = useState(null);
    const [newChannel, handleNewChannel] = useState(null);
    const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null);

    // Load initial data and set up listeners
    useEffect(() => {
        // Get Channels
        fetchChannels(setChannels);
        // Listen for new messages
        const messageListener = supabase
            .from('messages')
            .on('INSERT', (payload) => handleNewMessage(payload.new))
            .subscribe();
        // Listen for changes to our users
        const userListener = supabase
            .from('users')
            .on('*', (payload) => handleNewOrUpdatedUser(payload.new))
            .subscribe();
        // Listen for new channels
        const channelListener = supabase
            .from('channels')
            .on('INSERT', (payload) => handleNewChannel(payload.new))
            .subscribe();
        // Cleanup on unmount
        return () => {
            messageListener.unsubscribe();
            userListener.unsubscribe();
            channelListener.unsubscribe();
        };
    }, []);

    // Update when the route changes
    useEffect(() => {
        if (channelId && channelId > 0) {
            fetchMessages(channelId, (messages) => {
                messages.forEach((x) => users.set(x.user_id, x.author));
                setMessages(messages);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelId]);

    // New message recieved from Postgres
    useEffect(() => {
        if (newMessage && newMessage.channel_id === Number(channelId)) {
            const handleAsync = async () => {
                let authorId = newMessage.user_id;
                if (!users.get(authorId))
                    await fetchUser(authorId, (user) => handleNewOrUpdatedUser(user));
                setMessages(messages.concat(newMessage));
            };
            handleAsync();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage]);

    // New channel recieved from Postgres
    useEffect(() => {
        if (newChannel) setChannels(channels.concat(newChannel));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newChannel]);

    // New or updated user recieved from Postgres
    useEffect(() => {
        if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newOrUpdatedUser]);

    return {
        // We can export computed values here to map the authors to each message
        messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
        channels: channels.sort((a, b) => a.slug.localeCompare(b.slug)),
        users,
    };
};
