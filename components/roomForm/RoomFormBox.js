import { Box, useColorModeValue } from '@chakra-ui/react';

export default function RoomFormBox({ children, ...props }) {
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <Box
      w="full"
      px={4}
      py={8}
      boxShadow="xl"
      borderRadius="xl"
      bgColor={bgColor}
      {...props}
    >
      {children}
    </Box>
  );
}
