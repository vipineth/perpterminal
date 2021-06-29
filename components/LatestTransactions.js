import { ArrowSmRightIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import useAmmToName from "../hooks/useAmmToName";
import { perpetualStatsFetcher } from "../utils/fetcher";
import { latestTransaction } from "../utils/query";
import fromUnixTime from "date-fns/fromUnixTime";
import { getSmallNumber, toNiceDate } from "../utils/helper";
import { format } from "date-fns";

export default function LatestTransactions({ heading = "" }) {
  let { data } = useSWR(latestTransaction, perpetualStatsFetcher);

  if (!data?.transactions) return "Loading";
  return (
    <div className="">
      <h3 className="py-5 text-lg font-bold text-gray-700">{heading}</h3>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <THead />
                {data.transactions?.map((d) => (
                  <TBody {...d} key={d.id} />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TBody(props) {
  let getNameFromAmm = useAmmToName();

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr key={props.amm}>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          <a
            className="underline"
            href={`https://blockscout.com/xdai/mainnet/tx/${props.transactionHash}`}
            target="_blank"
          >
            {format(fromUnixTime(props.date), "Pp")}
          </a>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          {getNameFromAmm(props.amm)}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
          {props?.exchangedPositionSize < 0 ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              Short
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              Long
            </span>
          )}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
          {getSmallNumber(props.spotPrice)}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
          {getSmallNumber(props?.exchangedPositionSize.replace("-", ""))}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
          {(getSmallNumber(props?.fee) * 1000).toFixed(2)}
        </td>

        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-800">
          <a
            className="underline"
            target="_blank"
            href={`https://blockscout.com/xdai/mainnet/address/${props.trader}/transactions`}
          >
            {`${props.trader?.slice(0, 4)}......${props.trader?.slice(-5)}`}
          </a>
        </td>
      </tr>
    </tbody>
  );
}

function THead() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Time
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Asset
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Side
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Entry Price
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Position Size
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Volume
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Trader
        </th>
      </tr>
    </thead>
  );
}
