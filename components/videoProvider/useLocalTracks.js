import { useState, useCallback } from 'react';
import Video from 'twilio-video';

export default function useLocalTracks() {
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);

  const removeLocalAudioTrack = useCallback(() => {
    if (audioTrack) {
      audioTrack.stop();
      setAudioTrack(null);
    }
  }, [audioTrack]);

  const removeLocalVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(null);
    }
  }, [videoTrack]);

  const getAudioAndVideoTracks = useCallback(() => {
    setIsAcquiringLocalTracks(true);

    return Video.createLocalTracks({ audio: true, video: true })
      .then((localTracks) => {
        const videoTrack = localTracks.find((track) => track.kind === 'video');
        const audioTrack = localTracks.find((track) => track.kind === 'audio');

        if (videoTrack) {
          setVideoTrack(videoTrack);
        }

        if (audioTrack) {
          setAudioTrack(audioTrack);
        }
      })
      .finally(() => setIsAcquiringLocalTracks(false));
  }, []);

  const localTracks = [audioTrack, videoTrack].filter(
    (track) => track !== undefined
  );

  return {
    localTracks,
    isAcquiringLocalTracks,
    removeLocalVideoTrack,
    removeLocalAudioTrack,
    getAudioAndVideoTracks,
  };
}
