import Stats from "./Stats";
import BarChart from "./BarChart";
import ChartHeader from "./ChartHeader";
import { useState } from "react";
import { getVolumeQuery } from "../utils/query";
import { perpetualStatsFetcher } from "../utils/fetcher";
import useSWR from "swr";
import { getSmallNumber } from "../utils/helper";
import fromUnixTime from "date-fns/fromUnixTime";
import Details from "./Details";
import Spinner from "./Spinner";

let OPTIONS = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "180D": 180,
  Max: 1000,
};

export default function Main() {
  let [range, setRange] = useState(90);
  const { data, error } = useSWR(getVolumeQuery, perpetualStatsFetcher);

  if (!data) return <Spinner />;

  let parsedData =
    data?.perpetualDayDatas?.map((one) => {
      let date = fromUnixTime(one.date); // The 0 there is the key, which sets the date to the epoch
      let volumeUSD = Number(getSmallNumber(one.volumeUSD));
      return { ...one, volumeUSD, date };
    }) || null;

  return (
    <main className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="mt-8 md:grid md:grid-cols-3 md:gap-4 space-y-10 md:space-y-0">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 col-span-2">
          <div className="rounded-lg h-96">
            <ChartHeader setRange={setRange} OPTIONS={OPTIONS} range={range} />
            <BarChart range={range} data={parsedData} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg px-5 py-6 sm:px-6 mt-8 sm:mt-0">
          <div className="rounded-lg">
            <Stats data={parsedData} />
          </div>
        </div>
      </div>
      <Details />
    </main>
  );
}
