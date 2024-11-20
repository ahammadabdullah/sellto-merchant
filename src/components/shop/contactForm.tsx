"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { getShopIdBySubDomain } from "@/actions/actions";
import { toast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";

const contactFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  invoiceId: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    subject: "",
    email: "",
    invoiceId: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  let subDomain: string;
  if (typeof window !== "undefined") {
    subDomain = window.location.hostname.split(".")[0];
  }

  const router = useRouter();
  useEffect(() => {
    const ticketId = localStorage.getItem("ticketId");
    if (ticketId) {
      const fetchTicket = async () => {
        const res = await fetch(`/api/tickets/${ticketId}`);
        const data = await res.json();
        if (data && data.status === "open") {
          router.push(`/contact/chat/${ticketId}`);
        }
      };
      fetchTicket();
    }
  }, [router]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const validatedData = contactFormSchema.parse(formData);
      console.log("Form data:", validatedData);
      const shopId = await getShopIdBySubDomain(subDomain);
      const data = { ...validatedData, shopId: shopId };
      const res = await fetch(`/api/tickets`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());
      const { ticketId } = res;

      if (ticketId) {
        toast({
          title: "Ticket Created!",
          variant: "default",
        });
        router.push(`/contact/chat/${ticketId}`);
        localStorage.setItem("ticketId", ticketId);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Enter the subject"
          required
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="invoiceId" className="flex flex-wrap gap-1 ">
          Invoice ID <p className="text-xs text-muted-foreground">(Optional)</p>
        </Label>
        <Input
          id="invoiceId"
          placeholder="Enter invoice ID if applicable"
          value={formData.invoiceId}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message"
          required
          className="min-h-[100px]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <Button
        loading={loading}
        type="submit"
        className="w-full gap-2 place-items-center"
      >
        Send Message <IoSend className="w-4 h-4" />
      </Button>
    </form>
  );
}
