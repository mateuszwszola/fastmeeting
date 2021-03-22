import { Box, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsFillChatFill } from 'react-icons/bs';

function ToggleChatButton({ onToggle, children }) {
  return (
    <Box>
      <IconButton onClick={onToggle} icon={<BsFillChatFill />} />
      {children}
    </Box>
  );
}

ToggleChatButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default ToggleChatButton;
