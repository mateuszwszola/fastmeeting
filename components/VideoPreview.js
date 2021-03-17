import { Box } from '@chakra-ui/react';
import { useVideoContext } from '@/lib/VideoContext';
import VideoTrack from './VideoTrack';

export default function VideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks?.find((track) => track?.kind === 'video');

  return <Box>{videoTrack && <VideoTrack track={videoTrack} />}</Box>;
}
