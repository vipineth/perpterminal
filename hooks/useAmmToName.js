import useSWR from "swr";
import { urlFetcher } from "../utils/fetcher";

export default function useAmmToName() {
  let {
    data: { layers },
  } = useSWR(`https://metadata.perp.exchange/production.json`, urlFetcher);

  let { layer1, layer2 } = layers;

  let names = Object.keys(layer2?.contracts).reduce((acc, cv) => {
    if (cv.endsWith("USDC")) {
      acc[layer2.contracts[cv].address.toLowerCase()] = {
        symbol: cv.replace("USDC", ""),
      };
      return acc;
    }
    return acc;
  }, {});

  function getName(name) {
    return names[name.toLowerCase()].symbol;
  }
  return getName;
}
