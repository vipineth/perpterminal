import { useRouter } from "next/router";
import Header from "../../components/Header";
import Account from "../../components/Account";
import useSWR from "swr";
import { getUserTransantions } from "../../utils/query";
import { perpetualStatsFetcher } from "../../utils/fetcher";
import Head from "next/head";

export default function Address() {
  let router = useRouter();
  let { data } = useSWR(
    getUserTransantions(router?.query.address),
    perpetualStatsFetcher
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Dashboard | {router?.query.address}</title>
      </Head>
      <Header title="Account" isSmall data={data} />
      <Account address={router?.query.address} data={data} />
    </div>
  );
}
