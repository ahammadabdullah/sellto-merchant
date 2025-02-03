import PageTitle from "@/components/dashboard/PageTitle";
import { Banknote, Settings } from "lucide-react";

import { Button } from "@/components/ui/CustomButton";
import { AllOrders, columns } from "./columns";
import { DataTable } from "@/components/helpers/data-table";
import { auth } from "@/auth";
import EarningsStats from "./components/Stats";
import { WithdrawalDrawer } from "./components/WithdrawlsDrawer";
import useShop from "@/components/hooks/use-shop";
import StripeConnect from "./components/StripeConnect";

async function getData(shopId: string): Promise<AllOrders[]> {
  // Mock data generation
  const mockOrders: AllOrders[] = Array.from({ length: 20 }, (_, index) => ({
    id: `ORD${(1000 + index).toString()}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    status: ["pending", "completed", "canceled"][Math.floor(Math.random() * 3)],
    amount: Number((Math.random() * 1000 + 50).toFixed(2)), // Random amount between 50 and 1050
    currency: "USD",
    link: "https://stipe.com/fwafw",
  }));

  return mockOrders;
}
async function getEarningsData() {
  return {
    currentBalance: "2,458.00",
    totalWithdrawn: "14,589.00",
    underWithdrawal: "1,000.00",
    totalEarnings: "17,047.00",
  };
}

export default async function Withdraw() {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return null;
  }
  const data = await getData(shopId);
  const earningsData = await getEarningsData();
  return (
    <main className="p-8">
      <div className="flex flex-wrap justify-between items-center mb-10 w-full md:gap-4">
        <PageTitle
          Icon={Banknote}
          title="Earnings"
          subTitle=""
          className="w-fit"
        />
        <div className="flex gap-2">
          <WithdrawalDrawer
            balance={Number(earningsData.currentBalance.replace(/,/g, ""))}
          ></WithdrawalDrawer>
          <StripeConnect />
        </div>
      </div>
      <EarningsStats stats={earningsData} className="mb-10" />

      <h2 className="font-clash text-2xl font-medium ml-2 mb-2">
        Withdrawal History
      </h2>
      <div
        className="bg-background rounded p-4 border"
        aria-label="Withdrawal History"
      >
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </main>
  );
}
