import { createContext } from 'react';
import PropTypes from 'prop-types';
import useVideoRoom from '@/components/videoProvider/useVideoRoom';
import useLocalTracks from './videoProvider/useLocalTracks';
import useHandleRoomDisconnection from './videoProvider/useHandleRoomDisconnection';

export const VideoContext = createContext();

function VideoProvider({ options, children, onError = () => {} }) {
  const {
    localTracks,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks();
  const { room, connect, isConnecting } = useVideoRoom(localTracks, options);

  useHandleRoomDisconnection(
    room,
    onError,
    removeLocalAudioTrack,
    removeLocalVideoTrack
  );

  return (
    <VideoContext.Provider
      value={{
        room,
        connect,
        isConnecting,
        isAcquiringLocalTracks,
        removeLocalAudioTrack,
        removeLocalVideoTrack,
        getAudioAndVideoTracks,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

VideoProvider.propTypes = {
  options: PropTypes.object,
};

export default VideoProvider;
