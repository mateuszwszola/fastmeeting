import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useState } from 'react';

export const MAX_PROFILE_ROOMS = 3;

const SkeletonRow = ({ width }) => (
  <Tr>
    <Td>
      <Skeleton height="10px" w={width} my={2} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={2} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={2} />
    </Td>
  </Tr>
);

const RoomTable = ({ rooms, isLoadingRooms, onDelete }) => {
  const tableHeaderColor = useColorModeValue('gray.50', 'gray.700');
  const [isEditting, setIsEditting] = useState(false);

  const roomListItems = rooms?.map((room) => (
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
        {isEditting ? (
          <ButtonGroup size="sm" variant="outline" spacing="6">
            <Button colorScheme="red" onClick={() => onDelete(room.id)}>
              Delete
            </Button>
            <CloseButton onClick={() => setIsEditting(false)} />
          </ButtonGroup>
        ) : (
          <Button
            onClick={() => setIsEditting(true)}
            variant="link"
            colorScheme="blue"
          >
            Edit
          </Button>
        )}
      </Td>
    </Tr>
  ));

  const skeletonRows = (
    <>
      <SkeletonRow width="75px" />
      <SkeletonRow width="125px" />
      <SkeletonRow width="50px" />
    </>
  );

  const content = isLoadingRooms ? skeletonRows : roomListItems;

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
              <Thead bgColor={tableHeaderColor}>
                <Tr>
                  <Th>Name</Th>
                  <Th>URL</Th>
                  <Th>
                    <VisuallyHidden>Options</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>{content}</Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan="3" textAlign="center">
                    {isLoadingRooms ? '...' : rooms.length} of{' '}
                    {MAX_PROFILE_ROOMS}
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

RoomTable.propTypes = {
  rooms: PropTypes.array,
  isLoadingRooms: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RoomTable;
