import useSWR from "swr";
import { perpetualStakingFetcher } from "../../utils/fetcher";
import { getRecentTx, getUnlockedTokens } from "../../utils/query";
import AfterCooldown from "./AfterCooldown";
import RecentTransactions from "./RecentTransactions";

export default function StakingDetails() {
  const { data: afterCooldownTx } = useSWR(
    getUnlockedTokens,
    perpetualStakingFetcher
  );
  const { data } = useSWR(getRecentTx, perpetualStakingFetcher);
  if (!data) return "";
  let { stakeTransactions, unstakeTransactions, withdrawTransactions } = data;

  return (
    <div>
      <AfterCooldown
        heading="Tokens Unlocked After Cooldown in next 7 Days"
        data={afterCooldownTx?.unstakeTransactions}
      />
      <RecentTransactions data={stakeTransactions} heading="Recently Staked" />
      <RecentTransactions
        data={unstakeTransactions}
        heading="Recently Unstaked"
      />
      <RecentTransactions
        data={withdrawTransactions}
        heading="Recently Withdrawn"
      />
    </div>
  );
}
