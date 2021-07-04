import Main from "../components/Main";
import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Perpetual Trader Dashboard</title>
      </Head>
      <Header title="Dashboard" />
      <Main />
    </div>
  );
}
