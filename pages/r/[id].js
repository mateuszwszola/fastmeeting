import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import MeetingLayout from '@/components/MeetingLayout';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import { useStore } from '@/lib/Store';
import { useAuth } from '@/lib/AuthContext';
import { addMessage } from '@/lib/db';

const MeetingsPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const messagesEndRef = useRef(null);

  // Else load up the page
  const { id: channelId } = router.query;
  const { messages, channels } = useStore({ channelId });

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [messages]);

  // Render the r and messages
  return (
    <MeetingLayout channels={channels} activeChannelId={channelId}>
      <div className="relative h-screen">
        <div className="Messages h-full pb-16">
          <div className="p-2 overflow-y-auto">
            {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
            <div ref={messagesEndRef} style={{ height: 0 }} />
          </div>
        </div>
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput onSubmit={async (text) => addMessage(text, channelId, user.id)} />
        </div>
      </div>
    </MeetingLayout>
  );
};

export default MeetingsPage;
