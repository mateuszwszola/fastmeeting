import { useCallback, useState, useRef, useEffect } from 'react';
import Video from 'twilio-video';
import { isMobile } from '@/utils/helpers';

function useVideoRoom(options = {}) {
  const [room, setRoom] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    // Make sure the connect function will always access the recent options object
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback((token, localTracks) => {
    setIsConnecting(true);

    return Video.connect(token, {
      ...optionsRef.current,
      tracks: localTracks,
    })
      .then((newRoom) => {
        setRoom(newRoom);
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
      })
      .catch((err) => {
        console.error(err);
        setIsConnecting(false);
      });
  }, []);

  return { room, connect, isConnecting };
}

export default useVideoRoom;
