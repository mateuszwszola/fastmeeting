const { HStack } = require('@chakra-ui/react');

const Controllers = ({ children }) => {
  return (
    <HStack
      w="full"
      justify="center"
      align="center"
      p={4}
      spacing={4}
      fontSize="sm"
      textAlign="center"
    >
      {children}
    </HStack>
  );
};

export default Controllers;
