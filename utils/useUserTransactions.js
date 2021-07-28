import { useEffect, useRef, useState } from "react";
import { fetcher, perpetualStatsFetcher } from "./fetcher";

function getQuery(userAddress, skip = 0) {
  return `{
    transactions(where: {trader: "${userAddress}"}, skip: ${skip}, first: 1000, orderBy: date, orderDirection: desc) {
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
      unrealizedPnlAfter
      transactionHash
      trader
      spotPrice
      realizedPnl
    }
  }
  `;
}

export default function useUserTransactions(address) {
  let [transactions, setTransactions] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let promises = [0, 1000, 2000, 3000, 4000, 5000].map((skip) => {
        return perpetualStatsFetcher(getQuery(address, skip));
      });
      Promise.all(promises)
        .then((res) => {
          return res.reduce((acc, cv) => acc.concat(cv.transactions), []);
        })
        .then((t) => {
          setTransactions(t);
        });
    }
    if (address) {
      fetchData();
    }
  }, [address]);
  return transactions;
}

// query MyQuery {
//   transactions(where: {trader: "0xae8a898dd41ebddd529cfbaa5acde32b3f6296fb", date_gt: "12122"}, first: 1000, orderBy: date, orderDirection: desc) {
//     amm
//     badDebt
//     blockNumber
//     date
//     exchangedPositionSize
//     fee
//     fundingPayment
//     gasPrice
//     gasUsed
//     id
//     liquidationPenalty
//     margin
//     positionNotional
//     positionSizeAfter
//   }
// }
