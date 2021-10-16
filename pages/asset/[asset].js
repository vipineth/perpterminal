import { useRouter } from "next/router";
import Header from "../../components/Header";
import useSWR from "swr";
import { getAmmDailyData } from "../../utils/query";
import { perpetualStatsFetcher } from "../../utils/fetcher";
import Head from "next/head";
import useAmmToName from "../../hooks/useAmmToName";

import { getName } from "../../hooks/useAmms";
import HeroChart from "../../components/HeroChart";
import Spinner from "../../components/Spinner";
import AssetDetails from "../../components/AssetDetails";
import Layout from "../../components/Layout";

export default function Address() {
  let router = useRouter();
  let { getAddressFromName } = useAmmToName();

  let { data } = useSWR(
    () => getAmmDailyData(getAddressFromName(router?.query.asset)),
    perpetualStatsFetcher
  );

  let assetLabel =
    router?.query.asset &&
    `${getName(
      router?.query.asset?.toUpperCase()
    )} (${router?.query.asset?.toUpperCase()})`;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Analytics of {assetLabel} Token | PerpTerminal</title>
        </Head>
        <Header title={assetLabel} />
        <main className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {data ? (
            <>
              <HeroChart data={data?.ammDayDatas} />
              <AssetDetails asset={getAddressFromName(router?.query.asset)} />
            </>
          ) : (
            <Spinner />
          )}
        </main>
      </div>
    </Layout>
  );
}
