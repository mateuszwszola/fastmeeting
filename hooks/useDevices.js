import { useEffect, useState } from 'react';

export default function useDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const getDevices = () =>
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => setDevices(devices));

    navigator.mediaDevices.addEventListener('devicechange', getDevices);

    getDevices();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);

  const audioInputDevices = devices.filter(
    (device) => device.kind === 'audioinput'
  );
  const videoInputDevices = devices.filter(
    (device) => device.kind === 'videoinput'
  );
  const audioOutputDevices = devices.filter(
    (device) => device.kind === 'audiooutput'
  );

  return {
    audioInputDevices,
    videoInputDevices,
    audioOutputDevices,
    hasAudioInputDevices: audioInputDevices.length > 0,
    hasVideoInputDevices: videoInputDevices.length > 0,
  };
}
