import { Ticket } from "lucide-react";
import PageTitle from "@/components/dashboard/PageTitle";

import { columns, TicketsList } from "./columns";
import { DataTable } from "@/components/helpers/data-table";
import { auth } from "@/auth";
import { getTickets } from "@/lib/api";

// async function getData(): Promise<TicketsList[]> {
//   return [
//     {
//       id: "728ed5fwaf2f",
//       subject: "Subject N1 wjfwaopjfawpiofghoi;gwhgioawi",
//       email: "farhan@level7i.com",
//       lastUpdate: Date.now(),
//       status: "active",
//     },
//     {
//       id: "728ewgesaf2f",
//       subject: "Subject N2",
//       email: "sohan@level7i.com",
//       lastUpdate: Date.now(),
//       status: "closed",
//     },
//     {
//       id: "728ed5fwaf2f",
//       subject: "Subject N3",
//       email: "blip@level7i.com",
//       lastUpdate: Date.now(),
//       status: "pending reply",
//     },
//     {
//       id: "728ed5fwaf2f",
//       subject: "Subject N1",
//       email: "farhan@level7i.com",
//       lastUpdate: Date.now(),
//       status: "active",
//     },
//     {
//       id: "728ewgesaf2f",
//       subject: "Subject N2",
//       email: "sohan@level7i.com",
//       lastUpdate: Date.now(),
//       status: "closed",
//     },
//     {
//       id: "728ed5fwaf2f",
//       subject: "Subject N3",
//       email: "blip@level7i.com",
//       lastUpdate: Date.now(),
//       status: "pending reply",
//     },
//   ];
// }
export default async function Home() {
  const session = await auth();
  const shopId = session?.user?.shopId;
  if (!shopId) {
    return null;
  }
  const data = await getTickets(shopId);
  console.log(data);
  return (
    <main className="p-8">
      <PageTitle Icon={Ticket} title="Tickets" subTitle="(total 3 tickets)" />
      <div className="bg-background rounded p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </main>
  );
}
