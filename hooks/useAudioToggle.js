import { useCallback } from 'react';
import useIsTrackEnabled from './useIsTrackEnabled';

export function useAudioToggle(audioTrack) {
  const isEnabled = useIsTrackEnabled(audioTrack);

  const toggleAudioEnabled = useCallback(() => {
    if (audioTrack) {
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
    }
  }, [audioTrack]);

  return [isEnabled, toggleAudioEnabled];
}
