import Link from "next/link";
import { useState } from "react";
import { USER_PNL_OPTIONS } from "../utils/constants";
import UserPnLChart from "./account/UserPnLChart";
import ChartHeader from "./ChartHeader";
import Spinner from "./Spinner";
import UserStats from "./UserStats";
import UserTransactions from "./UserTransactions";

function Account({ userStats, isInvalid }) {
  let [range, setRange] = useState(100);
  if (isInvalid)
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-600 text-center pt-24">
          This ethereum address is invalid, please enter a valid address.
        </h1>
        <p className="text-center text-xl pt-12">
          <Link href="/">
            <a className="underline ">Go back to homepage! 🏠</a>
          </Link>
        </p>
      </div>
    );
  if (userStats === undefined) return <Spinner />;

  if (userStats === null) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-600 text-center pt-24">
          No transaction found for this address.
        </h1>
        <p className="text-center text-xl pt-12">
          <a href="https://perp.exchange" className="underline ">
            Start trading now! 💰
          </a>
        </p>
      </div>
    );
  }

  return (
    <main className="-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="mt-8 md:grid md:grid-cols-3 md:gap-4 space-y-10 md:space-y-0">
        <div className="bg-white rounded-lg shadow px-4 py-4 col-span-2">
          <div className="rounded-lg h-96">
            <ChartHeader
              setRange={setRange}
              OPTIONS={USER_PNL_OPTIONS}
              range={range}
              title="PnL of Transactions"
            />

            <UserPnLChart data={userStats} range={range} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-6 mt-8 sm:mt-0">
          <div className="rounded-lg">
            <UserStats userStats={userStats} />
          </div>
        </div>
      </div>
      <div>
        <h3 className="py-5 text-lg font-bold text-gray-700">
          User Transactions
        </h3>
        <UserTransactions userStats={userStats} />
      </div>
    </main>
  );
}

export default Account;
