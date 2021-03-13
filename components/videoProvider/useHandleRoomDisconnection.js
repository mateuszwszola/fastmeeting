import { useEffect } from 'react';

export default function useHandleRoomDisconnection(
  room,
  onError,
  removeLocalAudioTrack,
  removeLocalVideoTrack
) {
  useEffect(() => {
    if (room) {
      const onDisconnected = (_room, error) => {
        if (error) {
          onError(error);
        }

        // removeLocalAudioTrack();
        // removeLocalVideoTrack();
        room.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
      };

      room.on('disconnected', onDisconnected);
      return () => {
        room.off('disconnected', onDisconnected);
      };
    }
  }, [onError, removeLocalAudioTrack, removeLocalVideoTrack, room]);
}
