// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

import { Ticket } from "lucide-react";
import PageTitle from "@/components/dashboard/PageTitle";

import { columns, TicketsList } from "./columns";
import { DataTable } from "@/components/helpers/data-table";

async function getData(): Promise<TicketsList[]> {
  return [
    {
      id: "728ed5fwaf2f",
      subject: "Subject N1 wjfwaopjfawpiofghoi;gwhgioawi",
      email: "farhan@level7i.com",
      lastUpdate: Date.now(),
      status: "active",
    },
    {
      id: "728ewgesaf2f",
      subject: "Subject N2",
      email: "sohan@level7i.com",
      lastUpdate: Date.now(),
      status: "closed",
    },
    {
      id: "728ed5fwaf2f",
      subject: "Subject N3",
      email: "blip@level7i.com",
      lastUpdate: Date.now(),
      status: "pending reply",
    },
    {
      id: "728ed5fwaf2f",
      subject: "Subject N1",
      email: "farhan@level7i.com",
      lastUpdate: Date.now(),
      status: "active",
    },
    {
      id: "728ewgesaf2f",
      subject: "Subject N2",
      email: "sohan@level7i.com",
      lastUpdate: Date.now(),
      status: "closed",
    },
    {
      id: "728ed5fwaf2f",
      subject: "Subject N3",
      email: "blip@level7i.com",
      lastUpdate: Date.now(),
      status: "pending reply",
    },
  ];
}
export default async function Home() {
  const data = await getData();
  return (
    <main className="p-8">
      <PageTitle Icon={Ticket} title="Tickets" subTitle="(total 3 tickets)" />
      <div className="bg-background rounded p-4 border">
        <DataTable columns={columns} data={data} pagination={true} />
      </div>
    </main>
  );
}
