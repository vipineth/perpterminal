import Link from "next/link";
import Spinner from "./Spinner";
import UserStats from "./UserStats";
import UserTransactions from "./UserTransactions";

function Account({ userStats, isInvalid }) {
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
    <main className="-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <UserStats userStats={userStats} />
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
