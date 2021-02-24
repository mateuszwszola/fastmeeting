import { createContext } from 'react';
import PropTypes from 'prop-types';
import useVideoRoom from '@/components/videoProvider/useVideoRoom';
import useLocalTracks from './videoProvider/useLocalTracks';

export const VideoContext = createContext();

function VideoProvider({ options, children }) {
  const {
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks();
  const { room, connect, leave, isConnecting } = useVideoRoom(options);

  return (
    <VideoContext.Provider
      value={{
        room,
        connect,
        leave,
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
