import fromUnixTime from "date-fns/fromUnixTime";

import { format } from "date-fns";
import Link from "next/link";
import {
  getSmallAddress,
  getSmallNumber,
  numberWithCommas,
  toNiceDateHourMinutes,
} from "../../utils/helper";
import Badge from "../common/Badge";

export default function RecentTransactions({ heading = "", data }) {
  if (!data) return "Loading";

  return (
    <div className="">
      {/* <h3 className="py-5 text-lg font-bold text-gray-700">{heading}</h3> */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <THead />
                {data.map((d, index) => (
                  <TBody {...d} key={d.id} index={index} />
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
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr
        key={props.amm}
        className={props.index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      >
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700">
          <Link href={`/account/${props.staker}`}>
            <a className="underline">{getSmallAddress(props.staker)}</a>
          </Link>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700 font-bold">
          {numberWithCommas(getSmallNumber(props.amount))}
        </td>

        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
          <a
            className="underline"
            href={`https://etherscan.io/tx/${props.transactionHash}`}
            target="_blank"
          >
            {format(fromUnixTime(props.date), "Pp")}
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
          User
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Amount (in PERP)
        </th>

        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Tx Hash
        </th>
      </tr>
    </thead>
  );
}
