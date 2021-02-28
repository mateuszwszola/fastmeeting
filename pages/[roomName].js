import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeeting } from '@/lib/MeetingContext';
import { useVideoContext } from '@/lib/VideoContext';
import MeetingLayout from '@/components/MeetingLayout';
import VideoProvider from '@/components/VideoProvider';
import Room from '@/components/Room';

function Meeting() {
  const router = useRouter();
  const { roomName } = router.query;
  const { token } = useMeeting();
  const { connect, leave, getAudioAndVideoTracks } = useVideoContext();

  useEffect(() => {
    if (!token) {
      router.push(`/?roomName=${roomName}`);
    }
  }, [roomName, router, token]);

  useEffect(() => {
    if (token) {
      getAudioAndVideoTracks().then((tracks) => connect(token, tracks));

      return () => {
        leave();
      };
    }
  }, [connect, getAudioAndVideoTracks, leave, token]);

  return (
    <MeetingLayout>
      <Room />
    </MeetingLayout>
  );
}

export default function MeetingContainer() {
  return (
    <VideoProvider>
      <Meeting />
    </VideoProvider>
  );
}
