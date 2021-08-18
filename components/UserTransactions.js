import { useImperativeHandle, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import fromUnixTime from "date-fns/fromUnixTime";
import useAmmToName from "../hooks/useAmmToName";
import { getSmallNumber, numberWithCommas } from "../utils/helper";
import TableAvatar from "./TableAvatar";
import { getIcon } from "../hooks/useAmms";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import Pagination from "./Table/Pagination";

export default function UserTransactions(props) {
  let [activeButton, setActiveButton] = useState("All");
  const tableInstance = useRef(null);
  let { getNameFromAddress, getAddressFromName } = useAmmToName();
  let uniqueAmms = useMemo(
    () =>
      [
        ...new Set(
          ["All"].concat(
            props.userStats?.transactions.map((a) => getNameFromAddress(a.amm))
          )
        ),
      ].filter(Boolean),
    [props.userStats]
  );
  const columns = useMemo(
    () => [
      {
        Header: "ASSET",
        accessor: "amm",
        disableSortBy: true,
        filter: "includes",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
              <TableAvatar icon={getIcon(getNameFromAddress(value))} />
              <span className="ml-2">{getNameFromAddress(value)}</span>
            </div>
          );
        },
      },
      {
        Header: "SIDE",
        disableSortBy: true,
        accessor: "exchangedPositionSize",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {value < 0 ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Short
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Long
                </span>
              )}
            </div>
          );
        },
      },
      {
        Header: "ENTRY PRICE",
        disableSortBy: true,
        accessor: "spotPrice",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {"$ " + getSmallNumber(value)}
            </div>
          );
        },
      },
      {
        Header: "POSITION SIZE",
        disableSortBy: true,
        accessor: "position-size",
        Cell: ({ row }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {numberWithCommas(
                getSmallNumber(
                  row.values.exchangedPositionSize.replace("-", "")
                )
              )}
            </div>
          );
        },
      },
      {
        Header: "VOLUME",
        accessor: "fee",
        sortMethod: (a, b) =>
          Number(getSmallNumber(a)) - Number(getSmallNumber(b)),
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {"$ " +
                numberWithCommas((getSmallNumber(value) * 1000).toFixed(2))}
            </div>
          );
        },
      },
      {
        Header: "PNL",
        accessor: "totalPnlAmount",
        sortMethod: (a, b) =>
          Number(getSmallNumber(a)) - Number(getSmallNumber(b)),
        Cell: ({ value }) => {
          return (
            <div
              className={`px-6 py-4 whitespace-nowrap text-sm ${
                getSmallNumber(value).toFixed(2) < 0
                  ? "text-red-700"
                  : "text-gray-800"
              }`}
            >
              <span className="inline-flex">
                {"$ " + numberWithCommas(getSmallNumber(value).toFixed(2))}

                {getSmallNumber(value).toFixed(2) < 0 ? (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-4 w-4 text-red-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-4 w-4 text-green-500"
                    aria-hidden="true"
                  />
                )}
              </span>
            </div>
          );
        },
      },
      {
        Header: "TIME",
        disableSortBy: true,
        accessor: "date",
        Cell: ({ value }) => {
          return (
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {
                <a
                  className="underline text-blue-600"
                  href={`https://blockscout.com/xdai/mainnet/tx/${1 + 1}`}
                  target="_blank"
                >
                  {format(fromUnixTime(value), "Pp")}
                </a>
              }
            </div>
          );
        },
      },
    ],
    []
  );
  const instance = useTable(
    {
      columns,
      data: props.userStats.transactions,
      autoResetSortBy: false,
      autoResetPage: false,
      initialState: { pageSize: 50 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setFilter,
  } = instance;

  useImperativeHandle(tableInstance, () => instance);

  const firstPageTransactions = page;
  // .filter((r) => {
  //   if (activeButton === "All") {
  //     return true;
  //   }
  //   return activeButton === getNameFromAddress(r.original.amm);
  // })
  // .slice(0, 50);

  return (
    <div className="flex flex-col">
      <ButtonGroup
        amms={uniqueAmms}
        setActiveButton={setActiveButton}
        activeButton={activeButton}
        tableInstance={tableInstance}
        getAddressFromName={getAddressFromName}
      />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                      >
                        <div className="inline-flex items-center">
                          <span className="mr-2">
                            {column.render("Header")}
                          </span>
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
              </thead>
              <TableBody
                transactions={firstPageTransactions}
                activeButton={activeButton}
                getNameFromAddress={getNameFromAddress}
                getTableBodyProps={getTableBodyProps}
                prepareRow={prepareRow}
              />
            </table>
            <Pagination
              pageCount={pageCount}
              gotoPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getClassName(index, arr, amm, activeBtn) {
  let classNames =
    "relative inline-flex items-center px-4 mb-4 sm:justify-center md:justify-start py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:border focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500";

  if (index === 0) {
    classNames = classNames + " rounded-l-md";
  }
  if (index === arr.length - 1) {
    classNames = classNames + " rounded-r-md";
  }
  if (index !== 0) {
    classNames = "-ml-px " + classNames;
  }

  if (amm?.toLowerCase() === activeBtn.toLowerCase()) {
    classNames = classNames + " bg-green-400 text-white";
  }
  return classNames;
}

function TableBody({ transactions, getTableBodyProps, prepareRow }) {
  return (
    <tbody {...getTableBodyProps()}>
      {transactions.map((transaction, index) => {
        prepareRow(transaction);
        return (
          <tr
            key={transaction.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            {...transaction.getRowProps()}
          >
            {transaction.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
function ButtonGroup(props) {
  return (
    <span className="relative z-0 inline-flex rounded-md mb-6 max-w-full flex-wrap">
      {props.amms.map((amm, index, arr) => {
        return (
          <button
            key={amm}
            type="button"
            className={getClassName(index, arr, amm, props.activeButton)}
            onClick={() => {
              props.setActiveButton(amm);
              props.tableInstance.current.setGlobalFilter(
                props.getAddressFromName(amm)
              );
            }}
          >
            {amm}
          </button>
        );
      })}
    </span>
  );
}
