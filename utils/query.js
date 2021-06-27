import { gql } from "graphql-request";

export const top5Trader = `{
  positions(first: 5, orderBy: totalPnlAmount, orderDirection: desc) {
    id
    trader
    margin
    openNotional
    leverage
    realizedPnl
    unrealizedPnl
    fundingPayment
    fee
    badDebt
    liquidationPenalty
    totalPnlAmount
    blockNumber
    timestamp
  }
}`;
export const getVolumeQuery = gql`
  query DailyVolume {
    perpetualDayDatas(first: 1000, orderBy: date, orderDirection: asc) {
      feesUSD
      tradeCount
      volumeUSD
      date
    }
  }
`;

export const last10Transaction = gql`
  query {
    positionChangedEvents(
      first: 10
      orderBy: blockNumber
      orderDirection: desc
    ) {
      id
      trader
      amm
      margin
      positionNotional
      exchangedPositionSize
      fee
      positionSizeAfter
      realizedPnl
      unrealizedPnlAfter
      badDebt
      liquidationPenalty
      spotPrice
      fundingPayment
    }
  }
`;

export function getAddressPosition(addr) {
  return `{
    positionChangedEvents(first: 1000, orderBy: timestamp, orderDirection: desc, where: {
      trader: "${addr}"
    }) {
      id
      trader
      amm
      margin
      positionNotional
      exchangedPositionSize
      fee
      positionSizeAfter
      realizedPnl
      unrealizedPnlAfter
      badDebt
      liquidationPenalty
      spotPrice
      fundingPayment
      timestamp
    }
  }`;
}

export function getPositionChanged(limit = 300) {
  return `{
    positionChangedEvents(first: ${limit}, orderBy: blockNumber, orderDirection: desc) {
      id
      trader
      amm
      margin
      positionNotional
      exchangedPositionSize
      fee
      positionSizeAfter
      realizedPnl
      unrealizedPnlAfter
      badDebt
      liquidationPenalty
      spotPrice
      fundingPayment
      timestamp
    }
  }
  `;
}
export function getTopTenTraders(limit = 300) {
  return `{
    positions(first: 10, orderBy: totalPnlAmount, orderDirection: desc) {
      id
      trader
      margin
      openNotional
      leverage
      realizedPnl
      unrealizedPnl
      fundingPayment
      fee
      badDebt
      liquidationPenalty
      totalPnlAmount
      blockNumber
      timestamp
    }
  }
  `;
}
