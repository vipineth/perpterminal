import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import { addAmmInfo } from "../utils/helper";
import * as gtag from "../utils/gtag";

import "../utils/style.css";
import { ModalProvider } from "../components/ModalContext";
import { UserAddressProvider } from "../components/AddressContext";
import WalletProvider from "../components/WalletContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  addAmmInfo();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <UserAddressProvider>
        <ModalProvider>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
        </ModalProvider>
      </UserAddressProvider>
    </>
  );
}

export default MyApp;
