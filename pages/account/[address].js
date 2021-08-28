import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Account from "../../components/Account";
import Head from "next/head";
import useSWR from "swr";
import { perpetualStatsFetcher } from "../../utils/fetcher";
import { getUserStats } from "../../utils/query";
import { isAddress } from "../../utils/helper";
import { useUserAddress } from "../../components/AddressContext";

export default function Address() {
  let [isInvalid, setIsInvalid] = useState(false);
  let { address, setAddress } = useUserAddress();

  let router = useRouter();

  useEffect(() => {
    setAddress(router.query?.address);
    if (!isAddress(router?.query.address)) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    return () => {
      setAddress("");
    };
  }, [router.query.address]);

  let { data: userStats } = useSWR(function () {
    if (!isAddress(router?.query.address)) {
      return null;
    }
    return getUserStats(router?.query?.address?.toLowerCase());
  }, perpetualStatsFetcher);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Protocol Dashboard | {router?.query.address}</title>
      </Head>
      <Header title="Account Details" isSmall isInvalid={isInvalid} />

      <Account
        userStats={userStats?.user}
        isInvalid={isInvalid}
        userAddress={router?.query.address?.toLowerCase()}
      />
    </div>
  );
}
