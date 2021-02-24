import { createContext } from 'react';
import PropTypes from 'prop-types';
import useVideoRoom from '@/components/videoProvider/useVideoRoom';

export const VideoContext = createContext();

function VideoProvider({ options, children }) {
  const { room, connect, leave, isConnecting } = useVideoRoom(options);

  return (
    <VideoContext.Provider value={{ room, connect, leave, isConnecting }}>
      {children}
    </VideoContext.Provider>
  );
}

VideoProvider.propTypes = {
  options: PropTypes.object,
};

export default VideoProvider;
