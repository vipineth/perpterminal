import supportedChains from "./supportedChains";

export function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  let chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    chainData = {
      error: "Network Not Supported",
    };
  }

  return chainData;
}
