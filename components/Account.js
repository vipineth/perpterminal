import useSWR from "swr";
import { perpetualStatsFetcher } from "../utils/fetcher";
import { getUserTransantions } from "../utils/query";
import Spinner from "./Spinner";
import UserStats from "./UserStats";
import UserTransactions from "./UserTransactions";

function Account({ address }) {
  let { data } = useSWR(getUserTransantions(address), perpetualStatsFetcher);

  if (!data) return <Spinner />;

  return (
    <main className="-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <UserStats data={data} />
      <div>
        <h3 className="py-5 text-lg font-bold text-gray-700">
          User Transactions
        </h3>
        <UserTransactions data={data} />
      </div>
    </main>
  );
}

export default Account;
