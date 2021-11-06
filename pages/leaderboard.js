import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";

import Layout from "../components/Layout";
import { useUserAddress } from "../components/AddressContext";
import useAmms from "../hooks/useAmms";
import TradingPairs from "../components/TradingPairs";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import useSWRImmutable from "swr/immutable";
import {
  getDailyUserData,
  getWeeklyUserData,
  getMonthlyUserData,
  getAllTimeUserData,
  getLastTimestamp,
} from "../utils/query";
import { perpetualStatsFetcher } from "../utils/fetcher";
import Spinner from "../components/Spinner";
import useSWR from "swr";

let tabs = {
  day: "24H",
  week: "7D",
  month: "30D",
  all: "ALL",
};

export default function Leaderboard() {
  let { address, setAddress } = useUserAddress();
  let [activeTab, setActiveTab] = useState("day");
  let { data: timestamps } = useSWRImmutable(
    getLastTimestamp,
    perpetualStatsFetcher
  );
  let { data } = useSWR(() => {
    if (!timestamps) return null;
    let time = Object.keys(timestamps).reduce((acc, key) => {
      acc[key] = timestamps[key][0]?.startDate;
      return acc;
    }, {});
    switch (activeTab) {
      case "day":
        return getDailyUserData(time.userDayDatas);
      case "month":
        return getMonthlyUserData(time.userMonthlyDatas);
      case "week":
        return getWeeklyUserData(time.userWeeklyDatas);
      default:
        return getAllTimeUserData();
    }
  }, perpetualStatsFetcher);

  let [ammDetails] = useAmms();

  useEffect(() => {
    if (address.trim()) {
      setAddress("");
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Leaderboard | PerpTerminal</title>
          <meta name="description" content=" " />
        </Head>
        <LeaderboardHeader
          title="Leaderboard"
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        <main className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {data ? (
            <LeaderboardTable data={ammDetails} tabs={tabs} traders={data} />
          ) : (
            <Spinner />
          )}
        </main>
      </div>
    </Layout>
  );
}
