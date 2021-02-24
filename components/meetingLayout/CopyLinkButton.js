import { useState, useEffect } from 'react';
import { Button, useClipboard } from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';

const CopyLinkButton = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const { hasCopied, onCopy } = useClipboard(roomUrl);

  useEffect(() => {
    setRoomUrl(window.location.href);
  }, []);

  return (
    <Button
      size="sm"
      onClick={onCopy}
      aria-label="Copy meeting link"
      leftIcon={<FaLink />}
    >
      {hasCopied ? 'Copied' : 'Copy link'}
    </Button>
  );
};

export default CopyLinkButton;
