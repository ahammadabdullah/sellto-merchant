import { cn } from "@/lib/utils";
import LargeInfoCard from "./StatsCard";
import { DollarSign } from "lucide-react";

interface EarningsStatsProps {
  className?: string;
  stats: {
    currentBalance: string;
    totalWithdrawn: string;
    totalEarnings: string;
  };
}

export default function EarningsStats({
  className,
  stats,
}: EarningsStatsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      <LargeInfoCard
        title="Current Balance"
        icon={<DollarSign className="w-6 h-6" />}
        value={stats.currentBalance}
        description="Available for withdrawal"
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
