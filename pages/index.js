import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import { getVolumeQuery } from "../utils/query";
import { perpetualStatsFetcher } from "../utils/fetcher";
import HeroChart from "../components/HeroChart";
import Details from "../components/Details";
import Spinner from "../components/Spinner";

export default function Home() {
  const { data, error } = useSWR(getVolumeQuery, perpetualStatsFetcher);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Trader Dashboard</title>
      </Head>
      <Header title="Dashboard" />
      <main className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {data ? (
          <>
            <HeroChart data={data?.perpetualDayDatas} />
            <Details />
          </>
        ) : (
          <Spinner />
        )}
      </main>
    </div>
  );
}
