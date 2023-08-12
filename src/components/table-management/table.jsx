// // // import "./App.css";
// // import tableData from "../../data.json";
// // import * as React from "react";
// // import { useTable } from "react-table";

// // function Table() {
// //   const data = React.useMemo(() => tableData, []);

// //   const columns = React.useMemo(
// //     () => [
// //       {
// //         Header: "Table Name",
// //         accessor: "tableName",
// //       },
// //       {
// //         Header: "Table Capacity",
// //         accessor: "tableCapacity",
// //       },
// //       {
// //         Header: "Status",
// //         accessor: "status",
// //       },
// //       {
// //         Header: "Action",
// //         accessor: "action",
// //       },
// //     ],
// //     []
// //   );

// //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
// //     useTable({ columns, data });

// //   return (
// //     <div className="App">
// //       <div className="container">
// //         <table {...getTableProps()}>
// //           <thead>
// //             {headerGroups.map((headerGroup) => (
// //               <tr {...headerGroup.getHeaderGroupProps()}>
// //                 {headerGroup.headers.map((column) => (
// //                   <th {...column.getHeaderProps()}>
// //                     {column.render("Header")}
// //                   </th>
// //                 ))}
// //               </tr>
// //             ))}
// //           </thead>
// //           <tbody {...getTableBodyProps()}>
// //             {rows.map((row) => {
// //               prepareRow(row);
// //               return (
// //                 <tr {...row.getRowProps()}>
// //                   {row.cells.map((cell) => (
// //                     <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
// //                   ))}
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Table;

// import tableData from "../../data.json";
// import * as React from "react";
// import { useTable } from "react-table";
// import { css } from "@emotion/react";
// import styled from "@emotion/styled";
// import styles from "../table-management/styles/table.module.css";

// function Table() {
//   const data = React.useMemo(() => tableData, []);

//   const getRowBorderStyle = () => {
//     return "2px solid #36b9cc"; // Border for booked rows
//   };

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Table Name",
//         accessor: "tableName",
//       },
//       {
//         Header: "Table Capacity",
//         accessor: "tableCapacity",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <div className={styles.App}>
//       <div className={styles.container}>
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               const rowBorderStyle = getRowBorderStyle(); // Get border style based on status
//               const StyledTableRow = styled.tr`
//                 border: ${rowBorderStyle};
//               `;

//               return (
//                 <StyledTableRow {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
//                   ))}
//                 </StyledTableRow>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Table;

import tableData from "../../data/tableData.json";
import * as React from "react";
import { useTable, usePagination } from "react-table";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const TableWrapper = styled.div`
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 160%;
  overflow: hidden;
`;

const Ctable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 10px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 10px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: left;
  padding-right: 79px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #36b9cc;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a8aae;
  }
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #2e59d9;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a8aae;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

function Table() {
  const data = React.useMemo(() => tableData, []);
  const handleEdit = () => {
    return; //
  };
  const handleDelete = () => {
    return; //
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Table Name",
        accessor: "tableName",
      },
      {
        Header: "Table Capacity",
        accessor: "tableCapacity",
      },
      {
        Header: "Status",
        accessor: "status",
      },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <ActionButtons>
            <StyledButton onClick={() => handleEdit(row)}>Edit</StyledButton>
            <StyledButton onClick={() => handleDelete(row)}>
              Delete
            </StyledButton>
          </ActionButtons>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
  } = useTable({ columns, data }, usePagination);

  return (
    <div className="App">
      <TableWrapper>
        <Ctable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Ctable>
        <PaginationWrapper>
          <PaginationButton
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </PaginationButton>

          <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </PaginationButton>
        </PaginationWrapper>
      </TableWrapper>
    </div>
  );
}

export default Table;
