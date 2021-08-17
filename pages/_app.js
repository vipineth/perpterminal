import { useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { addAmmInfo } from "../utils/helper";
import * as gtag from "../utils/gtag";

import "../utils/style.css";

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
  return <Component {...pageProps} />;
}

export default MyApp;
