import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react";

const SkeletonTable: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table size="lg" overflowX="auto" w="75vw">
        <Thead background={"gray.100"}>
          <Tr>
            <Th textAlign="center" padding="1.6rem">
              <Box w="100px" height="15px" className="shine" />
            </Th>
            <Th textAlign="center">
              <Box w="100px" height="15px" className="shine" />
            </Th>
            <Th textAlign="center">
              <Box w="100px" height="15px" className="shine" />
            </Th>
            <Th textAlign="center">
              <Box w="100px" height="15px" className="shine" />
            </Th>
            <Th textAlign="center">
              <Box w="100px" height="15px" className="shine" />
            </Th>
            <Th textAlign="center">
              <Box w="100px" height="15px" className="shine" />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr >
            <Td textAlign="center" padding="1.6rem">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
          </Tr>

          <Tr>
            <Td textAlign="center" padding="1.6rem">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
          </Tr>

          <Tr>
            <Td textAlign="center" padding="1.6rem">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
            <Td textAlign="center">
              <Box w="100px" className="shine" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default SkeletonTable;
