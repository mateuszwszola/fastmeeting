import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const EmptyState = () => {
  const boxColor = useColorModeValue('white', 'gray.700');
  const headerColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.900');

  return (
    <Box mt={[4, 6]} boxShadow="md" rounded="lg" bgColor={boxColor}>
      <Box
        w="full"
        h="50px"
        bgColor={headerColor}
        roundedTop="lg"
        borderBottom="1px"
        borderColor={borderColor}
      />

      <Flex
        flexDir="column"
        justify="center"
        align="center"
        py={[16, 32]}
        px={[8, 16]}
        textAlign="center"
      >
        <Heading as="h3" size="lg">
          You haven&apos;t added any rooms.
        </Heading>
        <Text mt={2}>
          Welcome{' '}
          <span role="img" aria-label="greeting hand">
            👋🏼
          </span>{' '}
          Let&apos;s get started
        </Text>
      </Flex>
    </Box>
  );
};

export default EmptyState;
