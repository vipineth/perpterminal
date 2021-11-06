import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { perpetualStakingFetcher, urlFetcher } from "../../utils/fetcher";
import { getTopStakers } from "../../utils/query";
import { getSmallNumber, numberWithCommas, toK } from "../../utils/helper";
import { PERP_PRICE_URL } from "../../utils/constants";

function TopStakers() {
  const { data } = useSWR(getTopStakers, perpetualStakingFetcher);
  let { data: tokenPriceUsd } = useSWRImmutable(PERP_PRICE_URL, urlFetcher);
  if (!data) return "";
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-10">
      <div className="px-4 py-5 sm:px-6 bg-gray-700 text-white font-bold">
        Top PERP Staking Addresses
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <THead />
        {data.stakers.map((d, index) => (
          <TBody
            {...d}
            key={d.id}
            index={index}
            tokenPriceUsd={tokenPriceUsd}
          />
        ))}
      </table>
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
          <a
            rel="noopener"
            target="_blank"
            className="underline hover:text-gray-900 text-base"
            href={`https://zapper.fi/account/${props.id}`}
          >
            {props.id}
          </a>
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-md text-gray-700 font-bold">
          {numberWithCommas(getSmallNumber(props.totalStaked))}
        </td>
        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
          {props.tokenPriceUsd &&
            toK(
              getSmallNumber(props.totalStaked) *
                props.tokenPriceUsd["perpetual-protocol"].usd
            )}
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
          Address
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
          Amount (in USD)
        </th>
      </tr>
    </thead>
  );
}

export default TopStakers;
