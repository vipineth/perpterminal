import { request } from "graphql-request";

export function fetcher(query) {
  return request(
    "https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph",
    query
  );
}
export function perpetualStats(query) {
  return request(
    "https://api.thegraph.com/subgraphs/name/vipineth/perpetual-protocol-stats",
    query
  );
}
