// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

import { Ticket } from "lucide-react";
import PageTitle from "@/components/dashboard/PageTitle";
import { Chat, TMessage } from "./_components/chat";

const defaultChatData = {
  ticketTopic: "Product Inquiry",
  customerName: "John Doe",
  sellerName: "Bone Smith",
  customerAvatar: "/placeholder.svg?height=40&width=40",
  sellerAvatar: "/placeholder.svg?height=40&width=40",
  initialMessages: [
    {
      id: 1,
      sender: "customer",
      content: "Hi, I have a question about the product.",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      sender: "seller",
      content: "Hello! I'd be happy to help. What would you like to know?",
      timestamp: "10:05 AM",
    },
    {
      id: 3,
      sender: "customer",
      content: "Does it come in different colors?",
      timestamp: "10:07 AM",
    },
    {
      id: 4,
      sender: "seller",
      content:
        "Yes, it's available in red, blue, and green. Which color are you interested in?",
      timestamp: "10:10 AM",
    },
  ],
};

export default async function Home() {
  return (
    <main className="p-8">
      <PageTitle Icon={Ticket} title="Tickets" subTitle="(total 3 tickets)" />
      <Chat
        ticketTopic={defaultChatData.ticketTopic}
        customerName={defaultChatData.customerName}
        sellerName={defaultChatData.sellerName}
        customerAvatar={defaultChatData.customerAvatar}
        sellerAvatar={defaultChatData.sellerAvatar}
        initialMessages={defaultChatData.initialMessages as TMessage[]}
      ></Chat>
      {/* <div className="bg-background rounded p-4 border"></div> */}
    </main>
  );
}
