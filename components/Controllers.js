const { HStack } = require('@chakra-ui/react');

const Controllers = ({ children, ...props }) => {
  return (
    <HStack
      w="full"
      justify="center"
      align="center"
      p={2}
      spacing={4}
      fontSize="sm"
      textAlign="center"
      {...props}
    >
      {children}
    </HStack>
  );
};

export default Controllers;
