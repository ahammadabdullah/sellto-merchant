"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getTimeFromDate } from "@/lib/utils";
import { revalidateMessage } from "@/lib/api";

export type TMessage = {
  id: string;
  ticketId: string;
  sender: "user" | "seller";
  content: string;
  createdAt: Date;
};

type ChatProps = {
  ticketTopic: string;
  customerName: string;
  sellerName: string;
  customerAvatar: string;
  sellerAvatar: string;
  initialMessages: TMessage[];
};

export function Chat({
  ticketTopic,
  customerName,
  sellerName,
  customerAvatar,
  sellerAvatar,
  initialMessages,
}: ChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [initialMessages]);

  const handleSendMessage = async () => {
    setLoading(true);
    if (newMessage.trim()) {
      const message = {
        sender: "user",
        content: newMessage.trim(),
      };
      const res = await fetch(
        `/api/tickets/${initialMessages[0].ticketId}/messages`,
        {
          method: "POST",
          body: JSON.stringify(message),
        }
      ).then((res) => res.json());
      revalidateMessage();
      setNewMessage("");
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-8xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="text-base">Topic: {ticketTopic}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative h-[600px] sm:h-[480px]">
        <ScrollArea className="h-full p-4">
          {initialMessages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  } items-center gap-2`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        message.sender === "user"
                          ? sellerAvatar
                          : customerAvatar
                      }
                      alt={
                        message.sender === "user" ? sellerName : customerName
                      }
                    />
                    <AvatarFallback>
                      {message.sender === "user"
                        ? sellerName.charAt(0)
                        : customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`font-semibold text-xs mb-1  ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.sender === "seller" ? sellerName : customerName}
                    </div>
                    <div
                      className={`rounded-lg p-3 w-full  ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 flex items-center ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{getTimeFromDate(message.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2 flex-col"
        >
          <div className="flex flex-wrap lg:flex-nowrap gap-2">
            <Textarea
              className="basis-[700px] grow"
              rows={1}
              name="message"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              loading={loading}
              type="submit"
              className="h-full lg:py-4 grow lg:grow-0"
            >
              <Send />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
