import Head from "next/head";
import Header from "../components/Header";
import useSWR from "swr";
import { getVolumeQuery } from "../utils/query";
import { perpetualStatsFetcher } from "../utils/fetcher";
import HeroChart from "../components/HeroChart";
import Details from "../components/Details";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { useUserAddress } from "../components/AddressContext";

export default function Home() {
  const { data, error } = useSWR(getVolumeQuery, perpetualStatsFetcher);
  let { address, setAddress } = useUserAddress();

  useEffect(() => {
    if (address.trim()) {
      setAddress("");
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Perpetual Protocol Traders Dashboard </title>
          <meta
            name="description"
            content="Take a deeper look all the perpetual trades on perp.exchaneg. It will help you view net profits, losses, volume and assets you traded. It will also help you track assets, daily volume and recent trades on perp exchange."
          />
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
    </>
  );
}
