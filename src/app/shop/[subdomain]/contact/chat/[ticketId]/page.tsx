import { getShop } from "@/actions/actions";
import { Chat, TMessage } from "./chat";
import { getChatData } from "@/lib/api";

const TicketData = async (ticketId: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/api/tickets/${ticketId}`);
  const data = await res.json();
  return data;
};

export default async function ContactPage({
  params,
}: {
  params: { ticketId: string };
}) {
  const ticketId = params.ticketId;
  const chats = await getChatData(ticketId);
  const ticket = await TicketData(ticketId);
  const shop = await getShop(ticket.shopId);

  return (
    <main className="w-full overflow-x-hidden relative">
      <Chat
        ticketTopic={ticket.subject}
        customerName={ticket.email}
        sellerName={shop?.name || "Seller"}
        customerAvatar={`https://ui-avatars.com/api/?name=${ticket.email}`}
        sellerAvatar={
          shop?.favicon || `https://ui-avatars.com/api/?name=${shop?.name}`
        }
        initialMessages={chats as TMessage[]}
      ></Chat>
    </main>
  );
}
