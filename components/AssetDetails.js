import useSWR from "swr";
import { perpetualStatsFetcher } from "../utils/fetcher";
import { ammLatestTransaction } from "../utils/query";
import Transactions from "./Transactions";

export default function AssetDetails({ asset }) {
  let { data } = useSWR(
    () => asset && ammLatestTransaction(asset),
    perpetualStatsFetcher
  );

  return (
    <Transactions heading="Latest Transactions" data={data?.transactions} />
  );
}
