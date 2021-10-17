/* This example requires Tailwind CSS v2.0+ */
import { ChartSquareBarIcon } from "@heroicons/react/outline";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  UserGroupIcon,
  ChartBarIcon,
  ColorSwatchIcon,
} from "@heroicons/react/solid";
import {
  getSmallNumber,
  numberWithCommas,
  toK,
  toKWithoutDollar,
} from "../../utils/helper";

let icons = {
  volume: <ChartBarIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  trades: <UserGroupIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  fee: <ColorSwatchIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  totalVolume: (
    <ChartSquareBarIcon className="h-4 w-4 text-white" aria-hidden="true" />
  ),
};

export default function StakingStats(props) {
  let stakingInfo = props.data;
  if (!stakingInfo) return <h1>Loading</h1>;

  return (
    <div>
      <dl className="space-y-3">
        <div className="relative bg-gray-200 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-green-700 rounded-md p-3">
              {icons.volume}
            </div>
            <p className="ml-16 text-sm font-medium text-gray-700 capitalize">
              Total PERP Staked
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {toKWithoutDollar(
                getSmallNumber(stakingInfo?.perpStakingInfo.totalStakedTokens)
              )}
            </p>
          </dd>
        </div>
        <div className="relative bg-gray-200 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-green-700 rounded-md p-3">
              {icons.trades}
            </div>
            <p className="ml-16 text-sm font-medium text-gray-700 capitalize">
              Total PERP Withdrawn (Reward)
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {toKWithoutDollar(
                getSmallNumber(
                  stakingInfo?.perpStakingInfo.totalWithdrawnTokens
                )
              )}
            </p>
          </dd>
        </div>
        <div className="relative bg-gray-200 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-green-700 rounded-md p-3">
              {icons.fee}
            </div>
            <p className="ml-16 text-sm font-medium text-gray-700 capitalize">
              Total PERP Stakers
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {numberWithCommas(stakingInfo?.perpStakingInfo.totalStakers)}
            </p>
          </dd>
        </div>
        <div className="relative bg-gray-600 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
          <a
            href="http://staking.perp.exchange/"
            target="_blank"
            rel="noopener"
            className="underline text-md font-bold text-white center"
          >
            <p className="center">Stake your PERP now!</p>
          </a>
        </div>
      </dl>
    </div>
  );
}
