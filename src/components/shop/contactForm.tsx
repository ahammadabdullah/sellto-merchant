"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Invalid email address"),
  invoiceId: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = contactFormSchema.parse(formData);
      console.log("Form data:", validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      }
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
      <Button type="submit" className="w-full gap-2 place-items-center">
        Send Message <IoSend className="w-4 h-4" />
      </Button>
    </form>
  );
}
