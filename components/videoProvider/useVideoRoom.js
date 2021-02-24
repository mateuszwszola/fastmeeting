import { useCallback, useState, useRef, useEffect } from 'react';
import Video from 'twilio-video';
import { isMobile } from '@/utils/helpers';

function useVideoRoom(options) {
  const [room, setRoom] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    // Make sure the connect function will always access the recent options object
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback((token) => {
    setIsConnecting(true);

    return Video.connect(token, { ...optionsRef.current })
      .then((newRoom) => {
        setRoom(newRoom);
        setIsConnecting(false);

        const disconnect = () => newRoom.disconnect();

        newRoom.once('disconnected', () => {
          setTimeout(() => setRoom(null));
          window.removeEventListener('beforeunload', disconnect);

          if (isMobile) {
            window.removeEventListener('pagehide', disconnect);
          }
        });

        window.addEventListener('beforeunload', disconnect);

        if (isMobile) {
          window.removeEventListener('pagehide', disconnect);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsConnecting(false);
      });
  }, []);

  const leave = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  return { room, connect, leave, isConnecting };
}

export default useVideoRoom;
