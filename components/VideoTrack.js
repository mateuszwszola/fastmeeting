import { Box } from '@chakra-ui/layout';
import { useRef, useEffect } from 'react';

export default function VideoTrack({ track }) {
  const ref = useRef();

  useEffect(() => {
    track.attach(ref.current);
    return () => {
      track.detach();
    };
  }, [track]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <Box as="video" w="full" h="full" ref={ref} autoPlay={true} />;
}
