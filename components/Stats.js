/* This example requires Tailwind CSS v2.0+ */
import { ChartSquareBarIcon } from "@heroicons/react/outline";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  UserGroupIcon,
  ChartBarIcon,
  ColorSwatchIcon,
} from "@heroicons/react/solid";

import { calculateStats, percentageDifference, toK } from "../utils/helper";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let icons = {
  volume: <ChartBarIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  trades: <UserGroupIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  fee: <ColorSwatchIcon className="h-4 w-4 text-white" aria-hidden="true" />,
  totalVolume: (
    <ChartSquareBarIcon className="h-4 w-4 text-white" aria-hidden="true" />
  ),
};

export default function Stats(props) {
  let [first, second, totalVolume] = calculateStats(props.data);

  if (!first) return <h1>Loading</h1>;
  let info = Object.keys(first).reduce((acc, cv) => {
    acc = acc.concat({
      [cv]: first[cv],
      change: percentageDifference(first[cv], second[cv]),
      label: "Avg. Weekly " + cv,
      property: cv,
    });
    return acc;
  }, []);

  let statsInfo = [
    {
      totalVolume,
      label: "Total Traded Volume",
      property: "totalVolume",
    },
    ...info,
  ];

  return (
    <div>
      <dl className="space-y-3">
        {statsInfo.map((item, i) => (
          <div
            key={i}
            className="relative bg-gray-200 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-green-700 rounded-md p-3">
                {icons[item.property]}
              </div>
              <p className="ml-16 text-sm font-medium text-gray-700 capitalize">
                {item.label}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {toK(item[item.property])}
              </p>
              {item.change && (
                <p
                  className={classNames(
                    item.change > 0 ? "text-green-600" : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  {item.change > 0 ? (
                    <ArrowSmUpIcon
                      className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowSmDownIcon
                      className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {item.change > 0 ? "Increased" : "Decreased"} by
                  </span>
                  {item.change.toFixed(2) + " %"}
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
