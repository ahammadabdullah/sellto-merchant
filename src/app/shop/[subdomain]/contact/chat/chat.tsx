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
import { ReplyIcon, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn, truncateString } from "@/lib/utils";

export type TMessage = {
  id: number;
  sender: "customer" | "seller";
  content: string;
  timestamp: string;
  replyTo?: number;
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
  const [messages, setMessages] = useState<TMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | undefined>(undefined);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: TMessage = {
        id: messages.length + 1,
        sender: "seller", // Switched from "customer" to "seller"
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        replyTo: replyingTo,
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setReplyingTo(undefined);
    }
  };

  const handleReply = (messageId: number) => {
    setReplyingTo(messageId);
    setTimeout(() => {
      const input = document.querySelector(
        'textarea[name="message"]'
      ) as HTMLTextAreaElement;
      if (input) {
        input.focus();
      }
    }, 0);
  };

  const cancelReply = () => {
    setReplyingTo(undefined);
  };

  const scrollToMessage = (messageId: number) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Card className="w-full max-w-8xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="text-base">Topic: {ticketTopic}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative h-[600px] sm:h-[480px]">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              ref={(el) => {
                messageRefs.current[message.id] = el;
              }}
              className={`flex mb-4 ${
                message.sender === "seller" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex flex-col ${
                  message.sender === "seller" ? "items-end" : "items-start"
                }`}
              >
                {message.replyTo && (
                  <div
                    className={`text-xs mb-1 p-2 opacity-65 rounded cursor-pointer ${
                      messages.find((m) => m.id === message.replyTo)?.sender ===
                      "seller"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                    onClick={() => scrollToMessage(message.replyTo!)}
                  >
                    {truncateString(
                      messages.find((m) => m.id === message.replyTo)?.content,
                      50
                    )}
                  </div>
                )}
                {/* message content */}
                <div
                  className={`flex ${
                    message.sender === "seller"
                      ? "flex-row-reverse"
                      : "flex-row"
                  } items-start gap-2 max-w-[70%]`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        message.sender === "seller"
                          ? sellerAvatar // Switched from customerAvatar to sellerAvatar
                          : customerAvatar
                      }
                      alt={
                        message.sender === "seller"
                          ? sellerName // Switched from customerName to sellerName
                          : customerName
                      }
                    />
                    <AvatarFallback>
                      {message.sender === "seller"
                        ? sellerName.charAt(0) // Switched from customerName.charAt(0) to sellerName.charAt(0)
                        : customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`font-semibold text-xs mb-1 ${
                        message.sender === "seller" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.sender === "seller"
                        ? sellerName // Switched from customerName to sellerName
                        : customerName}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "seller"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 flex items-center gap-2 ${
                    message.sender === "seller"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <span>{message.timestamp}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReply(message.id)}
                  >
                    <ReplyIcon className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
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
          {replyingTo && (
            <div className="text-sm flex flex-wrap justify-between items-center">
              <div
                className={cn(
                  "border p-2 rounded-lg opacity-55",
                  messages.find((m) => m.id === replyingTo)?.sender === "seller"
                    ? "bg-primary"
                    : "bg-secondary"
                )}
              >
                Replying to:{" "}
                {truncateString(
                  messages.find((m) => m.id === replyingTo)?.content,
                  50
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={cancelReply}>
                Cancel Reply
              </Button>
            </div>
          )}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 ">
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

            <Button type="submit" className="h-full lg:py-4 grow lg:grow-0">
              <Send />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
