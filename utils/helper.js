import BigNumber from "bignumber.js";

import Numeral from "numeral";
import format from "date-fns/format";
import cloneDeep from "lodash.clonedeep";

export const toK = (num) => {
  return "$ " + Numeral(num).format("0,0.[00]a");
};

export const toNiceDateYear = (date) => {
  return format(date, "MMMM dd, yyy");
};

export const toNiceDate = (date) => {
  return format(date, "dd MMM");
};

export function getBigNumber(value) {
  return new BigNumber(value).shiftedBy(18).toString();
}

export function getSmallNumber(value) {
  return new BigNumber(value).shiftedBy(-18).decimalPlaces(2).toNumber();
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function percentageDifference(a, b) {
  let difference = 100 * Math.abs((a - b) / ((a + b) / 2));
  if (a > b) {
    return difference;
  } else {
    return -difference;
  }
}

export function numberWithCommas(x) {
  return Number(x)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateStats(stats) {
  if (!stats) return [];
  let copy = cloneDeep(stats);
  let firstWeek = copy.sort(() => -1).splice(1, 7);
  let secondWeek = copy.splice(1, 7);

  let firstWeekData = firstWeek.reduce(
    (acc, cv) => {
      return {
        totalVolume: acc.totalVolume.plus(cv.volumeUSD),
        totalFee: acc.totalFee.plus(cv.feesUSD),
        totalTrades: acc.totalTrades + Number(cv.tradeCount),
      };
    },
    {
      totalVolume: new BigNumber(0),
      totalFee: new BigNumber(0),
      totalTrades: 0,
    }
  );
  let secondWeekData = secondWeek.reduce(
    (acc, cv) => {
      return {
        totalVolume: acc.totalVolume.plus(cv.volumeUSD),
        totalFee: acc.totalFee.plus(cv.feesUSD),
        totalTrades: acc.totalTrades + Number(cv.tradeCount),
      };
    },
    {
      totalVolume: new BigNumber(0),
      totalFee: new BigNumber(0),
      totalTrades: 0,
    }
  );
  let presentWeek = {
    volume: firstWeekData.totalVolume.toNumber() / 7,
    fee: getSmallNumber(firstWeekData.totalFee) / 7,
    trades: Math.floor(firstWeekData.totalTrades / 7),
  };
  let prevWeek = {
    volume: secondWeekData.totalVolume.toNumber() / 7,
    fee: getSmallNumber(secondWeekData.totalFee) / 7,
    trades: Math.floor(secondWeekData.totalTrades / 7),
  };

  let allVolume = BigNumber.sum(...stats.map((t) => t.volumeUSD)).toNumber();

  return [presentWeek, prevWeek, allVolume];
}

export function getUserStatsInfo(transactions = []) {
  if (transactions.length > 0) {
    let totalFees = getSmallNumber(
      BigNumber.sum(...transactions.map((t) => t.fee))
    );
    let totalPnL =
      getSmallNumber(BigNumber.sum(...transactions.map((t) => t.realizedPnl))) -
      totalFees;
    return [
      { label: "Total Trade Volume", amount: toK(totalFees * 1000) },
      { label: "Total Number of Trades", amount: transactions.length },
      {
        label: "Total PnL (Excluding Fee)",
        amount: "$ " + numberWithCommas(totalPnL),
      },
    ];
  }
}

export const usdcIcon =
  "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png";
