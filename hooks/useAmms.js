import useSWR from "swr";
import { perpetualStatsFetcher, urlFetcher } from "../utils/fetcher";
import ammsInfo from "../utils/ammsInfo";
import tokenlist from "../utils/tokenlist.json";
import { getAmmDayDetails } from "../utils/query";
import groupby from "lodash.groupby";
import { getSmallNumber, toK } from "../utils/helper";

let url = "https://metadata.perp.exchange/production.json";
export function getIcon(symbol) {
  try {
    return ammsInfo?.[symbol].logoURI;
  } catch (error) {}
  try {
    return tokenlist?.tokens.find(
      (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
    ).logoURI;
  } catch (error) {}
}

export function getName(symbol) {
  try {
    return ammsInfo?.[symbol].name;
  } catch (error) {}
  try {
    return tokenlist?.tokens.find(
      (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
    ).name;
  } catch (error) {}
}

function useAmms() {
  let { data, error } = useSWR(url, urlFetcher);
  let { data: res, err } = useSWR(getAmmDayDetails, perpetualStatsFetcher);

  if (!data) return [];

  let amms = Object.keys(data?.layers?.layer2?.contracts).reduce((acc, key) => {
    if (key.endsWith("USDC")) {
      let symbol = key.replace("USDC", "");
      let icon = getIcon(symbol);
      let name = getName(symbol);
      acc = acc.concat({
        ...data?.layers.layer2?.contracts[key],
        icon,
        symbol,
      });
    }
    return acc;
  }, []);

  let now = res?.ammDayDatas[0].date;
  let groupedAmms = groupby(res?.ammDayDatas, "date");
  let ammDataToday = groupedAmms[now];

  let final = ammDataToday?.map((singleAmm) => {
    let otherInfo = amms.find((a) => a.address.toLowerCase() === singleAmm.amm);
    return {
      ...singleAmm,
      ...otherInfo,
      feesUSD: toK(getSmallNumber(singleAmm.feesUSD)),
      volumeUSD: toK(getSmallNumber(singleAmm.volumeUSD)),
    };
  });
  return [final, error];
}

export default useAmms;
