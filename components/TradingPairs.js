import { ArrowSmRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import TableAvatar from "./TableAvatar";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";

export default function TradingPairs({ heading = "", data = [] }) {
  const columns = useMemo(
    () => [
      {
        Header: "ASSET",
        accessor: "symbol",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <div className="px-6 py-3 whitespace-nowrap flex items-center">
              <TableAvatar icon={row.original.icon} />
              <p className="text-sm font-medium text-gray-900 ml-2">{value}</p>
            </div>
          );
        },
      },
      {
        Header: "TRADE VOLUME (24H)",
        accessor: "volumeUSD",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-3 whitespace-nowrap text-md text-gray-800 text-center">
              {value}
            </div>
          );
        },
      },
      {
        Header: "FEES COLLECTED (24H)",
        accessor: "feesUSD",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-3 whitespace-nowrap text-md text-gray-800 text-center">
              {value}
            </div>
          );
        },
      },
      {
        Header: "NUMBER OF TRADES (24H)",
        accessor: "tradeCount",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-3 whitespace-nowrap text-md text-gray-800 text-center">
              {value}
            </div>
          );
        },
      },
      {
        Header: "",
        accessor: "moreStats",
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
              <span className="sm:ml-3">
                <Link href={`/asset/${row.original.symbol}`}>
                  <a
                    type="button"
                    className="inline-flex items-center px-4 py-2 rounded-md border-transparent bg-green-600 text-sm font-medium text-white hover:bg-green-800"
                  >
                    More Stats
                    <ArrowSmRightIcon
                      className="ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </Link>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        autoResetSortBy: false,
        autoResetPage: false,
      },
      useSortBy
    );

  return (
    <div className="">
      <h3 className="py-5 text-lg font-bold text-gray-700">{heading}</h3>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...getTableProps()}
              >
                <THead headerGroups={headerGroups} />

                <TBody
                  rows={rows}
                  getTableBodyProps={getTableBodyProps}
                  prepareRow={prepareRow}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TBody({ rows, getTableBodyProps, prepareRow }) {
  return (
    <tbody
      {...getTableBodyProps()}
      className="bg-white divide-y divide-gray-200"
    >
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function THead({ headerGroups }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              <div className="inline-flex items-center">
                <span className="mr-2">{column.render("Header")}</span>
                {column.canSort && (
                  <div className="inline-flex flex-col leading-3 text-gray-400">
                    <span
                      className={
                        column.isSorted && !column.isSortedDesc
                          ? "text-green-700"
                          : ""
                      }
                    >
                      ▲
                    </span>
                    <span
                      className={
                        column.isSorted && column.isSortedDesc
                          ? "text-green-700"
                          : ""
                      }
                    >
                      ▼
                    </span>
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

// function THead() {
//   return (
//     <thead className="bg-gray-50">
//       <tr>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           Icon
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           Asset
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           Trade Volume (24h)
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           Fees Collected (24h)
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           Number of Trades (24h)
//         </th>
//         <th scope="col" className="relative px-6 py-3">
//           <span className="sr-only">Trade Now</span>
//         </th>
//       </tr>
//     </thead>
//   );
// }
