"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { WithdrawalForm } from "./WithdrawlsForm";

import { Button } from "@/components/ui/CustomButton";

interface WithdrawalDrawerProps {
  balance: number;
  children?: React.ReactNode;
}

export function WithdrawalDrawer({ balance, children }: WithdrawalDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children ? children : <Button>Request Withdrawal</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10 px-4">
          <WithdrawalForm balance={balance} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
