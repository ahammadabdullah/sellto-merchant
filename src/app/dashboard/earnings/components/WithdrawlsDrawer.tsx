"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { WithdrawalForm } from "./WithdrawlsForm";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/CustomButton";

interface WithdrawalDrawerProps {
  balance: number;
  children?: React.ReactNode;
}

export function WithdrawalDrawer({ balance, children }: WithdrawalDrawerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (amount: number) => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/withdrawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process withdrawal");
      }

      toast({
        title: "Success",
        description: "Your withdrawal request has been submitted successfully",
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children ? children : <Button>Request Withdrawal</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10 px-4">
          <WithdrawalForm
            balance={balance}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            loading={loading}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
