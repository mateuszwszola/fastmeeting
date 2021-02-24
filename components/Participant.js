import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import IdentityText from './participant/IdentityText';

const trackpubsToTracks = (trackMap) =>
  Array.from(trackMap.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);

function Participant({ participant }) {
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

  return (
    <Box position="relative" w="full" mx="auto">
      <IdentityText>{participant.identity}</IdentityText>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </Box>
  );
}

Participant.propTypes = {
  participant: PropTypes.object.isRequired,
};

export default Participant;
