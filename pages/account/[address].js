import { useRouter } from "next/router";
import Header from "../../components/Header";
import Account from "../../components/Account";
import Head from "next/head";
import useSWR from "swr";
import { perpetualStatsFetcher } from "../../utils/fetcher";
import { getUserStats } from "../../utils/query";

export default function Address() {
  let router = useRouter();
  let { data: userStats } = useSWR(
    getUserStats(router?.query.address?.toLowerCase()),
    perpetualStatsFetcher
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Protocol Dashboard | {router?.query.address}</title>
      </Head>
      <Header title="Account" isSmall />
      <Account
        userStats={userStats?.user}
        userAddress={router?.query.address?.toLowerCase()}
      />
    </div>
  );
}
