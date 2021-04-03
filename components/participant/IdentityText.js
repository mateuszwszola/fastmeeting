import { Box } from '@chakra-ui/react';

const IdentityText = ({ children }) => {
  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      marginLeft={2}
      marginBottom={2}
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
