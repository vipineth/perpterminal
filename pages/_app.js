import "tailwindcss/tailwind.css";
import { addAmmInfo } from "../utils/helper";

import "../utils/style.css";

function MyApp({ Component, pageProps }) {
  addAmmInfo();
  return <Component {...pageProps} />;
}

export default MyApp;
