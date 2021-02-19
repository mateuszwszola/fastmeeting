import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

const NavLink = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Button as="a" variant="link" {...props}>
        {children}
      </Button>
    </NextLink>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default NavLink;
