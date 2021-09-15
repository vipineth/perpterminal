import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import useSWR from "swr";
import { getStakingDayDatas, getStakingInfo } from "../utils/query";
import { perpetualStakingFetcher } from "../utils/fetcher";
import Spinner from "../components/Spinner";
import { useUserAddress } from "../components/AddressContext";
import StakingChart from "../components/staking/StakingChart";
import ChartHeader from "../components/ChartHeader";
import { PERP_STAKING } from "../utils/constants";
import StakingStats from "../components/staking/StakingStats";
import StakingDetails from "../components/staking/StakingDetails";

export default function Home() {
  const { data, error } = useSWR(getStakingDayDatas, perpetualStakingFetcher);
  const { data: stakingData } = useSWR(getStakingInfo, perpetualStakingFetcher);

  let { address, setAddress } = useUserAddress();
  let [range, setRange] = useState(30);
  useEffect(() => {
    if (address.trim()) {
      setAddress("");
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Perpetual Protocol Staking Dashboard </title>
          <meta
            name="description"
            content="Take a deeper look all the perpetual trades on perp.exchaneg. It will help you view net profits, losses, volume and assets you traded. It will also help you track assets, daily volume and recent trades on perp exchange."
          />
        </Head>
        <Header title="PERP Staking Overview" />
        <main className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {data ? (
            <>
              <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-4 space-y-10 lg:space-y-0">
                <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 col-span-2">
                  <div className="rounded-lg h-96">
                    <ChartHeader
                      setRange={setRange}
                      OPTIONS={PERP_STAKING}
                      range={range}
                      title="24H Staking Details"
                    />
                    <StakingChart range={range} data={data} />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-6 mt-8 sm:mt-0">
                  <div className="rounded-lg">
                    <StakingStats data={stakingData} />
                  </div>
                </div>
              </div>
              <StakingDetails />
            </>
          ) : (
            <Spinner />
          )}
        </main>
      </div>
    </>
  );
}
