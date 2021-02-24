import { createContext } from 'react';
import PropTypes from 'prop-types';
import useVideoRoom from '@/components/videoProvider/useVideoRoom';

export const VideoContext = createContext();

function VideoProvider({ roomName, children }) {
  const { room, connect, leave, isConnecting } = useVideoRoom(roomName);

  return (
    <VideoContext.Provider value={{ room, connect, leave, isConnecting }}>
      {children}
    </VideoContext.Provider>
  );
}

VideoProvider.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default VideoProvider;
