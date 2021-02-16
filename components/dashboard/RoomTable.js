import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from '@chakra-ui/react';

export const MAX_PROFILE_ROOMS = 3;

const RoomTable = ({ rooms }) => {
  return (
    <Flex mt={[6, 12]} flexDir="column">
      <Box overflowX="auto" my={-2} mx={{ sm: -6, lg: -8 }}>
        <Box
          py={2}
          verticalAlign="middle"
          display="inline-block"
          minW="full"
          px={{ sm: 6, lg: 8 }}
        >
          <Box
            boxShadow="base"
            overflow="hidden"
            borderBottom="1"
            borderColor="gray.200"
            borderRadius={{ sm: 'lg' }}
          >
            <Table minW="full">
              <Thead bgColor="gray.50">
                <Tr>
                  <Th>Name</Th>
                  <Th>URL</Th>
                  <Th>
                    <VisuallyHidden>Options</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {rooms.map((room) => (
                  <Tr key={room.id}>
                    <Td whiteSpace="nowrap">{room.name}</Td>
                    <Td whiteSpace="nowrap">
                      <NextLink href={`/${room.slug}`} passHref>
                        <Button as="a" variant="link" colorScheme="blue">
                          /{room.slug}
                        </Button>
                      </NextLink>
                    </Td>
                    <Td whiteSpace="nowrap" textAlign="right">
                      <Button variant="link" colorScheme="blue">
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan="3" textAlign="center">
                    2 of {MAX_PROFILE_ROOMS}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const rooms = [
  {
    id: '1',
    name: 'Daily Standup',
    slug: 'daily-standup',
    owner_id: 'uuid-1',
  },
  {
    id: '2',
    name: 'Fun Time',
    slug: 'fun-time',
    owner_id: 'uuid-2',
  },
];

RoomTable.defaultProps = {
  rooms,
};

RoomTable.propTypes = {
  rooms: PropTypes.array.isRequired,
};

export default RoomTable;
