import { useState } from "react";
import useSWR from "swr";
import { perpetualStakingFetcher } from "../../utils/fetcher";
import { getRecentTx } from "../../utils/query";
import AfterCooldown from "./AfterCooldown";
import RecentTransactions from "./RecentTransactions";
import Tabs from "./Tabs";

export default function StakingDetails() {
  const tabsInfo = [
    { name: "Recently Staked", label: "staked" },
    { name: "Recently Unstaked", label: "unstaked" },
    { name: "Recently Withdrawn", label: "withdrawn" },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data } = useSWR(getRecentTx, perpetualStakingFetcher);

  if (!data) return "";
  let { stakeTransactions, unstakeTransactions, withdrawTransactions } = data;

  return (
    <div>
      <AfterCooldown heading="Tokens Unlocked After Cooldown in next 3 Days" />

      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mt-10">
        <div className="px-4 py-5 sm:px-6 bg-gray-700">
          <Tabs
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            tabsInfo={tabsInfo}
          />
        </div>

        {tabsInfo[activeTabIndex].label === "stake" ? (
          <RecentTransactions
            data={stakeTransactions}
            heading="Recently Staked"
          />
        ) : tabsInfo[activeTabIndex].label === "unstaked" ? (
          <RecentTransactions
            data={unstakeTransactions}
            heading="Recently Unstaked"
          />
        ) : (
          <RecentTransactions
            data={withdrawTransactions}
            heading="Recently Withdrawn"
          />
        )}
      </div>
    </div>
  );
}
