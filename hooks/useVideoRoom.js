import { useCallback, useState } from 'react';
import Video from 'twilio-video';

function useVideoRoom(roomName) {
  const [room, setRoom] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(
    (token) => {
      setIsConnecting(true);

      Video.connect(token, {
        name: roomName,
      })
        .then((room) => {
          setIsConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setIsConnecting(false);
        });
    },
    [roomName]
  );

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
