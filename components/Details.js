import useSWR from "swr";
import useAmms from "../hooks/useAmms";
import { perpetualStatsFetcher } from "../utils/fetcher";
import { latestTransaction } from "../utils/query";
import Transactions from "./Transactions";
import TradingPairs from "./TradingPairs";

export default function Details() {
  let [ammDetails] = useAmms();
  let { data } = useSWR(latestTransaction, perpetualStatsFetcher);

  return (
    <>
      <TradingPairs heading="Trading Pairs" data={ammDetails} />
      <Transactions heading="Latest Transactions" data={data?.transactions} />
    </>
  );
}
