import { getUserStatsInfo } from "../utils/helper";

export default function UserStats(props) {
  let stats = getUserStatsInfo(props.data?.transactions);

  if (!stats) return <h2>Loading ...</h2>;
  return (
    <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
      {stats.map((item, i) => (
        <div key={item.label} className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">{item.label}</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div
              className={`flex items-baseline text-3xl font-bold text-gray-700 ${
                String(item.amount).includes("-")
                  ? "text-red-600"
                  : "text-green-600"
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
