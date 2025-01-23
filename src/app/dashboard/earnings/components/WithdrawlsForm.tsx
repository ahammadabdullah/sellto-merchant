"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";

interface WithdrawalFormProps {
  balance: number;
  setOpen: (open: boolean) => void;
  loading?: boolean;
}

export function WithdrawalForm({ balance, setOpen }: WithdrawalFormProps) {
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      Number.parseFloat(amount) > 0 &&
      Number.parseFloat(amount) <= balance &&
      agreed
    ) {
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
          description:
            "Your withdrawal request has been submitted successfully",
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
    }
  };

  const isValid =
    Number.parseFloat(amount) > 0 &&
    Number.parseFloat(amount) <= balance &&
    agreed;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="balance">Current Balance</Label>
        <Input
          id="balance"
          value={`$${balance.toFixed(2)}`}
          disabled
          className="hidden"
        />
        <h2 className="text-xl sm:text-3xl font-clash font-medium">
          <span className="text-primary2">$</span> {balance.toFixed(2)}
        </h2>
      </div>
      <div>
        <Label htmlFor="amount">Withdrawal Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            max={balance}
            step="0.01"
            required
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">USD</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
        />
        <Label htmlFor="terms">
          I agree to the{" "}
          <Link href="/withdrawal-terms" className="underline">
            terms and conditions
          </Link>
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        This will initiate a withdrawal request which would be completed after a
        seller admin reviews it.
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading || !isValid}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </div>
    </form>
  );
}
