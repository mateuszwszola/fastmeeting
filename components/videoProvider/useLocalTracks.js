import useDevices from '@/hooks/useDevices';
import { useState } from 'react';

export default function useLocalTracks() {
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);
  const {} = useDevices();
}
