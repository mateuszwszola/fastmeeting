import { useColorModeValue, Flex } from '@chakra-ui/react';

const Header = ({ children, ...props }) => {
  const headerBgColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Flex
      as="header"
      w="full"
      align="center"
      bgColor={headerBgColor}
      borderBottom="2px"
      borderColor={borderColor}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Header;
