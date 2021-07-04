import { useRouter } from "next/router";
import Header from "../../components/Header";
import Account from "../../components/Account";
import useSWR from "swr";
import { getUserTransantions } from "../../utils/query";
import { perpetualStatsFetcher } from "../../utils/fetcher";

export default function Address() {
  let router = useRouter();
  let { data } = useSWR(
    getUserTransantions(router?.query.address),
    perpetualStatsFetcher
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Account" isSmall data={data} />
      <Account address={router?.query.address} data={data} />
    </div>
  );
}
