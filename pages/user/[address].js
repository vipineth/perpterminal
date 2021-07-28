import { useRouter } from "next/router";
import Header from "../../components/Header";
import Account from "../../components/Account";
import Head from "next/head";
import useUserTransactions from "../../utils/useUserTransactions";

export default function Address() {
  let router = useRouter();

  let data = useUserTransactions(router?.query.address);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Dashboard | {router?.query.address}</title>
      </Head>
      <Header title="Account" isSmall />
      <Account data={data} />
    </div>
  );
}
