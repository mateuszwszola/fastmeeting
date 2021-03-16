import { useCallback, useState, useRef, useEffect } from 'react';
import Video from 'twilio-video';
import { isMobile } from '@/utils/helpers';

function useVideoRoom(localTracks, options = {}) {
  const [room, setRoom] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    // Make sure the connect function will always access the recent options object
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(
    (token) => {
      setIsConnecting(true);

      return Video.connect(token, {
        ...optionsRef.current,
        tracks: localTracks,
      }).then(
        (newRoom) => {
          setRoom(newRoom);
          window.room = newRoom;
          setIsConnecting(false);

          const disconnect = () => newRoom.disconnect();

          newRoom.once('disconnected', () => {
            console.log('Once disconnected');
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
        },
        (error) => {
          console.error(error);
          setIsConnecting(false);
        }
      );
    },
    [localTracks]
  );

  return { room, connect, isConnecting };
}

export default useVideoRoom;
