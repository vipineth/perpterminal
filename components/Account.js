import Spinner from "./Spinner";
import UserStats from "./UserStats";
import UserTransactions from "./UserTransactions";

function Account({ userStats }) {
  if (!userStats) return <Spinner />;
  if (userStats.transactions.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-white text-center pt-24">
        No transaction found 😉{" "}
        <a target="_blank" href="https://perp.exchange" className="underline">
          Start Trading Now
        </a>
      </h1>
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
