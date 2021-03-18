import { Heading, useColorModeValue } from '@chakra-ui/react';

export default function RoomFormHeading({ children, ...props }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Heading
      color={textColor}
      as="h3"
      fontSize={['2xl', '3xl']}
      textAlign="center"
      fontWeight="medium"
      {...props}
    >
      {children}
    </Heading>
  );
}
