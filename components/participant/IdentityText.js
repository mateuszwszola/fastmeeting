import { Box } from '@chakra-ui/react';

const IdentityText = ({ children }) => {
  return (
    <Box
      ml={2}
      mb={2}
      position="absolute"
      bottom={0}
      left={0}
      bgColor="black"
      opacity="0.8"
      p={1}
      borderRadius="md"
      color="white"
      fontWeight="medium"
    >
      {children}
    </Box>
  );
};

export default IdentityText;
