import { Box } from '@chakra-ui/react';

const Footer = ({ children, ...props }) => {
  return (
    <Box as="footer" w="full" p={4} mt={8} {...props}>
      <Box w="full" maxW="1280px" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Footer;
