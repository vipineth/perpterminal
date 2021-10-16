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
import Layout from "../components/Layout";

export default function Home() {
  const { data, error } = useSWR(getVolumeQuery, perpetualStatsFetcher);
  let { address, setAddress } = useUserAddress();

  useEffect(() => {
    if (address.trim()) {
      setAddress("");
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>
            PerpTerminal | Analytics Dashboard for Perpetual Protocol (PERP)
            Traders 🔥
          </title>
          <meta
            name="description"
            content="Analytics on all your Perpetual Protocol (PERP) trades. PerpTerminal assists traders to make more informed trading decisions by allowing access to various analytics."
          />
        </Head>
        <Header title="Perp Exchange Overview" />
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
    </Layout>
  );
}
