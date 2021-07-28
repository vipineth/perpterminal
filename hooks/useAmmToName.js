import useSWR from "swr";
import { urlFetcher } from "../utils/fetcher";

export default function useAmmToName() {
  let { data } = useSWR(
    `https://metadata.perp.exchange/production.json`,
    urlFetcher
  );

  if (!data)
    return { getNameFromAddress: () => null, getAddressFromName: () => null };

  let { layer2 } = data?.layers;

  let names = Object.keys(layer2?.contracts).reduce((acc, cv) => {
    if (cv.endsWith("USDC")) {
      acc[layer2.contracts[cv].address.toLowerCase()] = {
        symbol: cv.replace("USDC", ""),
        address: layer2.contracts[cv].address.toLowerCase(),
      };
      return acc;
    }
    return acc;
  }, {});
  function getNameFromAddress(addr) {
    return names[addr.toLowerCase()].symbol;
  }
  function getAddressFromName(name) {
    return Object.values(names).find(
      (t) => t.symbol.toLowerCase() === name.toLowerCase()
    ).address;
  }

  return { getNameFromAddress, getAddressFromName };
}
