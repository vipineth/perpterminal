import Head from "next/head";
import Header from "../components/Header";

export default function Staking() {
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
        <Header title="Address Book" isSmall />
        <main className="-mt-20">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6  pb-24">
              Hello
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
