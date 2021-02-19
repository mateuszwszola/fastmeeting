import { useColorModeValue, Box } from '@chakra-ui/react';

const Header = ({ children, ...props }) => {
  const headerBgColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Box
      as="header"
      w="full"
      bgColor={headerBgColor}
      borderBottom="2px"
      borderColor={borderColor}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Header;
