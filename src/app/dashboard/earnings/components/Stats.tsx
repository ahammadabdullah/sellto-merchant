import { cn } from "@/lib/utils";
import LargeInfoCard from "./StatsCard";
import { DollarSign } from "lucide-react";

interface EarningsStatsProps {
  className?: string;
  stats: {
    currentBalance: string;
    totalWithdrawn: string;
    totalEarnings: string;
    underWithdrawal: string;
  };
}

export default function EarningsStats({
  className,
  stats,
}: EarningsStatsProps) {
  return (
    <div
      className={cn("flex flex-wrap min-[1380px]:flex-nowrap gap-4", className)}
    >
      <LargeInfoCard
        title="Current Balance"
        icon={<DollarSign className="w-6 h-6" />}
        value={stats.currentBalance}
        description="Total balance in your sellto account"
      />
      <LargeInfoCard
        title="Under Withdrawal"
        icon={<DollarSign className="w-6 h-6" />}
        value={stats.underWithdrawal ?? false}
        description="Amount under withdrawal request"
      />

      <LargeInfoCard
        title="Total Withdrawn"
        icon={<DollarSign className="w-6 h-6" />}
        value={stats.totalWithdrawn}
        description="Total amount withdrawn to date"
      />

      <LargeInfoCard
        title="Earnings to Date"
        icon={<DollarSign className="w-6 h-6" />}
        value={stats.totalEarnings}
        description="Your earnings since first sale."
      />
    </div>
  );
}
