import { filterAddress } from "../../utils/constants";
import { getSmallNumber, numberWithCommas } from "../../utils/helper";

export default function LeaderboardTable({ traders }) {
  let key = Object.keys(traders)[0];
  let data = traders[key].filter(
    (d) => !filterAddress.includes(String(d.address).toLowerCase())
  );

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-10">
      <table className="min-w-full divide-y divide-gray-200">
        <THead />
        {data.map((d, index) => (
          <TBody {...d} key={d.id} index={index} />
        ))}
      </table>
    </div>
  );
}

function TBody(props) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr
        key={props.address}
        className={props.index % 2 === 0 ? "bg-white" : "bg-gray-50"}
      >
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700">
          <a
            rel="noopener"
            target="_blank"
            className="underline hover:text-gray-900 text-base"
            href={`/account/${props.address}`}
          >
            {props.address}{" "}
          </a>
          <span className="text-xl">
            {" "}
            {props.index === 0
              ? "🥇"
              : props.index === 1
              ? "🥈"
              : props.index === 2
              ? "🥉"
              : ""}
          </span>
        </td>
        {/* <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700 font-bold">
          {numberWithCommas(props.totalTrades)}
        </td> */}
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700">
          {numberWithCommas(getSmallNumber(props.totalVolume))}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 font-bold">
          {numberWithCommas(getSmallNumber(props.totalPnL))}
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
          Trader
        </th>
        {/* <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Number of Trades
        </th> */}
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Total Volume
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Total Profit / Loss
        </th>
      </tr>
    </thead>
  );
}
