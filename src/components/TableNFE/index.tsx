import React, { useMemo } from "react";

import { useTable } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

const TableNFE: React.FC<any> = ({ data }: any) => {
  console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: "Data de emissão",
        accessor: "emissionDate",
      },
      {
        Header: "Nome do emitente",
        accessor: "emitterName",
      },
      {
        Header: "CNPJ do emitente",
        accessor: "emitterCNPJ",
      },
      {
        Header: "Nome do destinatário",
        accessor: "receiverName",
      },
      {
        Header: "CNPJ do emitente",
        accessor: "receiverCNPJ",
      },

      {
        Header: "Valor Total (R$)",
        accessor: "amount",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<any>({ columns, data });

  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Table {...getTableProps()} size="lg" overflowX="auto" w="75vw">
        <Thead background={"gray.100"}>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} textAlign="center">
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    padding={{ xs: "2rem" }}
                    textAlign="center"
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableNFE;
