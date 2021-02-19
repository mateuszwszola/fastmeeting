import { Flex } from '@chakra-ui/react';

const Nav = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      w="100%"
      maxW="1280px"
      mx="auto"
      flexWrap="wrap"
      justify="space-between"
      align="center"
      p={[2, 4]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Nav;
