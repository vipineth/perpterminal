import useAmmToName from "../hooks/useAmmToName";
import fromUnixTime from "date-fns/fromUnixTime";
import { getSmallNumber, numberWithCommas } from "../utils/helper";
import { format } from "date-fns";
import TableAvatar from "./TableAvatar";
import { getIcon } from "../hooks/useAmms";
import { useState } from "react";

export default function UserTransactions(props) {
  let [activeButton, setActiveButton] = useState("All");
  let getNameFromAmm = useAmmToName();
  let uniqueAmms = ["All"].concat(
    [...new Set(props.data?.transactions.map((p) => p.amm))].map((a) =>
      getNameFromAmm(a)
    )
  );

  return (
    <div className="flex flex-col">
      <ButtonGroup
        amms={uniqueAmms}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    Asset
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    Side
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    ENTRY PRICE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    POSITION SIZE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    VOLUME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                  >
                    TIME
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.data?.transactions
                  .filter((t) => {
                    if (activeButton === "All") return true;
                    if (
                      getNameFromAmm(t.amm).toLowerCase() ===
                      activeButton.toLowerCase()
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                        <TableAvatar
                          icon={getIcon(getNameFromAmm(transaction.amm))}
                        />
                        <span className="ml-2">
                          {getNameFromAmm(transaction.amm)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {transaction.exchangedPositionSize < 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Short
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Long
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {"$ " + getSmallNumber(transaction.spotPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {numberWithCommas(
                          getSmallNumber(
                            transaction.exchangedPositionSize.replace("-", "")
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {"$ " +
                          numberWithCommas(
                            (getSmallNumber(transaction.fee) * 1000).toFixed(2)
                          )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {
                          <a
                            className="underline text-blue-600"
                            href={`https://blockscout.com/xdai/mainnet/tx/${transaction.transactionHash}`}
                            target="_blank"
                          >
                            {format(fromUnixTime(transaction.date), "Pp")}
                          </a>
                        }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function getClassName(index, arr, amm, activeBtn) {
  let classNames =
    "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:border focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500";

  if (index === 0) {
    classNames = classNames + " rounded-l-md";
  }
  if (index === arr.length - 1) {
    classNames = classNames + " rounded-r-md";
  }
  if (index !== 0) {
    classNames = "-ml-px " + classNames;
  }

  if (amm.toLowerCase() === activeBtn.toLowerCase()) {
    classNames = classNames + " bg-green-400 text-white";
  }
  return classNames;
}
function ButtonGroup(props) {
  return (
    <span className="relative z-0 inline-flex rounded-md mb-6">
      {props.amms.map((amm, index, arr) => {
        return (
          <button
            type="button"
            className={getClassName(index, arr, amm, props.activeButton)}
            onClick={() => props.setActiveButton(amm)}
          >
            {amm}
          </button>
        );
      })}
    </span>
  );
}
