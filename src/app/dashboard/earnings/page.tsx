import PageTitle from "@/components/dashboard/PageTitle";
import { Banknote } from "lucide-react";

export default async function Withdraw() {
  return (
    <main className="p-8">
      <PageTitle Icon={Banknote} title="Earnings" subTitle="" />
    </main>
  );
}
