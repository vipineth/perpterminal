import { getUserStatsInfo } from "../utils/helper";

export default function UserStats({ userStats }) {
  let stats = getUserStatsInfo(userStats);
  if (!stats) return <h2 className="mx-auto text-white">Loading ...</h2>;
  return (
    <dl className="rounded-lg space-y-3 bg-white overflow-hidden divide-y divide-gray-200 md:divide-y-0 md:divide-x">
      {stats.map((item, i) => (
        <div
          key={item.label}
          className="relative bg-gray-200 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt className="text-base font-normal text-gray-900">{item.label}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div
              className={`flex items-baseline text-3xl font-bold text-gray-700 ${
                String(item.amount).includes("-")
                  ? "text-red-600"
                  : "text-green-700"
              }`}
            >
              {item.amount}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
