import { request } from "graphql-request";

export function fetcher(query) {
  return request(
    "https://api.thegraph.com/subgraphs/name/perpetual-protocol/perp-position-subgraph",
    query
  );
}
export function perpetualStatsFetcher(query, variables) {
  return request(
    "https://api.thegraph.com/subgraphs/name/vipineth/perpetual-protocol-stats",
    query,
    variables
  );
}
export function testPerpetualStatsFetcher(query) {
  return request(
    "https://api.thegraph.com/subgraphs/id/QmefLtiXgu5KQ7Zc3XN2pNqjfDvzvSLvDUNy8kD8FcwbpJ",
    query
  );
}

export const urlFetcher = (...args) => fetch(...args).then((res) => res.json());
