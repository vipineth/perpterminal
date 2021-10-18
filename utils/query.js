import getUnixTime from "date-fns/getUnixTime";
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
export const getAmmDayDetails = gql`
  query AmmDayDetails {
    ammDayDatas(orderBy: date, orderDirection: desc, where: {}) {
      amm
      feesUSD
      tradeCount
      volumeUSD
      date
    }
  }
`;

export const latestTransaction = gql`
  query LatestTransactions {
    transactions(first: 15, orderBy: date, orderDirection: desc) {
      amm
      badDebt
      blockNumber
      date
      exchangedPositionSize
      fee
      fundingPayment
      gasPrice
      gasUsed
      id
      liquidationPenalty
      margin
      positionNotional
      positionSizeAfter
      realizedPnl
      spotPrice
      trader
      transactionHash
      unrealizedPnlAfter
    }
  }
`;
export const ammLatestTransaction = (amm) => `
query AmmLatestTransaction {
  transactions(first: 20, orderBy: date, orderDirection: desc, where: {amm: "${amm}"}) {
    amm
    badDebt
    blockNumber
    date
    exchangedPositionSize
    fee
    fundingPayment
    gasPrice
    gasUsed
    id
    liquidationPenalty
    margin
    positionNotional
    positionSizeAfter
    realizedPnl
    spotPrice
    trader
    transactionHash
    unrealizedPnlAfter
  }
}

`;

export function getAmmDailyData(amm) {
  return `query AmmDayData {
    ammDayDatas(first: 1000, where: {amm: "${amm}"}, orderBy: date, orderDirection: asc) {
    amm
    date
    feesUSD
    id
    tradeCount
    volumeUSD
  }
 }`;
}
export function getUserStats(address) {
  return `{
    user(id: "${address}"){
      totalPnL
      totalTrades
      totalVolume
      assetList
      address
      transactions(first: 1000, orderBy: date, orderDirection: desc) {
        amm
        badDebt
        blockNumber
        date
        unrealizedPnlAfter
        transactionHash
        trader
        totalPnlAmount
        spotPrice
        realizedPnl
        positionSizeAfter
        positionNotional
        gasPrice
        margin
        liquidationPenalty
        id
        gasUsed
        fundingPayment
        fee
        exchangedPositionSize
      }
    }
  }`;
}
export function getUserTransantions(addr) {
  return `{
    transactions(
      where: { trader:  "${addr}"}
      orderBy: date
      orderDirection: desc
      first: 1000
    ) {
      amm
      badDebt
      blockNumber
      date
      exchangedPositionSize
      fee
      fundingPayment
      gasPrice
      gasUsed
      id
      liquidationPenalty
      margin
      positionNotional
      positionSizeAfter
      realizedPnl
      spotPrice
      trader
      transactionHash
      unrealizedPnlAfter
    }
  }`;
}
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
export function getStakingDayDatas() {
  return `query StakingDayData {
    stakingDayDatas(first: 1000, orderBy: date, orderDirection: desc) {
      totalStaked
      totalUnstaked
      totalWithdrawn
      id
      date
    }
  }`;
}
export function getStakingInfo() {
  return `query StakingInfo {
    perpStakingInfo(id: "1") {
      totalStakedTokens
      totalWithdrawnTokens
      totalStakers
    }
  }`;
}
export function getUnlockedTokens() {
  let start = new Date();
  start.setUTCHours(start.getHours() - 5.5, 0, 0, 0);
  let dayStartTimestamp = getUnixTime(start);
  let oneDatTimestamp = 86400;
  let numberOfDays = 3;
  return `query MyQuery {
    unstakeTransactions(first: 20,where: {tokenUnlockTimestamp_gt: ${dayStartTimestamp}, tokenUnlockTimestamp_lt: ${
    dayStartTimestamp + oneDatTimestamp * numberOfDays
  }}) {
      amount
      date
      id
      staker
      tokenUnlockTimestamp
      transactionHash
    }
  }`;
}
export function getRecentTx() {
  return `query RecentTx {
    withdrawTransactions(first: 25, orderBy: date, orderDirection: desc) {
      amount
      date
      id
      staker
      transactionHash
    }
    unstakeTransactions(first: 25, orderBy: date, orderDirection: desc) {
      amount
      date
      id
      staker
      tokenUnlockTimestamp
      transactionHash
    }
    stakeTransactions(first: 25, orderBy: date, orderDirection: desc) {
      amount
      date
      id
      transactionHash
      staker
    }
  }
  `;
}
export function getTopStakers() {
  return `query GetTopStakers {
    stakers(first: 25, orderBy: totalStaked, orderDirection: desc) {
      id
      totalStaked
      totalWithdrawn
    }
  }`;
}
