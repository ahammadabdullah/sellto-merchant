"use client";
import useShop from "@/components/hooks/use-shop";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StripeConnect = () => {
  const { shop, refetch } = useShop();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleConnectStripe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopId: shop?.id, email: shop?.User?.email }),
      });
      const data = await res.json();
      refetch();
      if (data.success) {
        if (data.onboardingUrl) {
          router.push(data.onboardingUrl);
        }
        toast({
          title: "Success",
          description: "Stripe account connected successfully",
          variant: "default",
        });
      } else throw new Error(data.error);
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleLoginStripe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/account/create-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: shop?.stripeAccountId }),
      });
      const data = await res.json();
      if (data.success) {
        window.open(data.loginLink, "_blank");
      } else throw new Error(data.error);
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  if (!shop?.stripeAccountId) {
    return (
      <Button
        loading={loading}
        onClick={handleConnectStripe}
        variant="default"
        title="connect stripe account"
      >
        Connect Stripe
      </Button>
    );
  } else
    return (
      <Button
        onClick={handleLoginStripe}
        variant="destructive"
        title="stripe account settings"
      >
        {shop.stripeStatus === "active"
          ? "Stripe Settings"
          : "Complete Stripe Account Setup"}
      </Button>
    );
};

export default StripeConnect;
