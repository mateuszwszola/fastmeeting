import { Button, useColorModeValue } from '@chakra-ui/react';

export const BrandButton = ({ children, ...props }) => {
  const variant = useColorModeValue('solid', 'outline');

  return (
    <Button {...props} variant={variant} colorScheme="yellow">
      {children}
    </Button>
  );
};
