import supportedChains from "./supportedChains";

export function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    throw new Error("ChainId missing or not supported");
  }

  return chainData;
}

export function ellipseAddress(address = "", width = 10) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
