import useAmms from "../hooks/useAmms";
import LatestTransactions from "./LatestTransactions";
import TradingPairs from "./TradingPairs";

export default function Details() {
  let [ammDetails] = useAmms();
  return (
    <>
      <TradingPairs heading="Trading Pairs" data={ammDetails} />
      <LatestTransactions heading="Latest Transactions" />
    </>
  );
}
