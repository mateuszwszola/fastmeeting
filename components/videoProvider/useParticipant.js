import { useState, useRef, useEffect } from 'react';
import { trackpubsToTracks } from '@/utils/helpers';

export default function useParticipant(participant) {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prevVideoTracks) => [...prevVideoTracks, track]);
      } else if (track.kind === 'audio') {
        setAudioTracks((prevAudioTracks) => [...prevAudioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prevVideoTracks) =>
          prevVideoTracks.filter((t) => t !== track)
        );
      } else if (track.kind === 'audio') {
        setAudioTracks((prevAudioTracks) =>
          prevAudioTracks.filter((t) => t !== track)
        );
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return { videoRef, audioRef };
}
