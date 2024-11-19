"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getShopIdBySubDomain, handlePaymentSuccess } from "@/actions/actions";
import { json } from "stream/consumers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import Loader from "@/components/Loader/Loader";

export interface StripeSession {
  customer: {
    email: string;
    name: string;
  };
  productData: string;
  lineItems: any;
  orderData: {
    paymentId: string;
    amount: number;
  };
}

const SuccessPage = ({ params }: { params: { subdomain: string } }) => {
  const subDomain = params.subdomain;
  const [sessionDetails, setSessionDetails] = useState<StripeSession | null>(
    null
  );
  const [successHandled, setSuccessHandled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const sessionProcessed = useRef(false);

  useEffect(() => {
    if (sessionProcessed.current) return;
    if (!session_id) return;

    const localData = localStorage.getItem("order_id");
    const parsedLocalData: string[] = localData ? JSON.parse(localData) : [];

    if (parsedLocalData.includes(session_id)) {
      router.push(`/`);
    } else {
      const updatedLocalData = [...parsedLocalData, session_id];
      localStorage.setItem("order_id", JSON.stringify(updatedLocalData));
      sessionProcessed.current = true;
    }
  }, [session_id, router]);
  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!session_id) return;

      try {
        const response = await fetch("/api/stripe/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session_id }),
        });
        const data = await response.json();

        setSessionDetails(data);

        if (!successHandled) {
          try {
            const shopId = await getShopIdBySubDomain(subDomain);
            const res = await handlePaymentSuccess(data, shopId as string);
            console.log(res);
            setSuccessHandled(true);
          } catch (error) {
            console.error("Error handling payment success:", error);
          }
          localStorage.removeItem("cart");
          const event = new Event("cart-updated");
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };
    fetchSessionDetails();
  }, [session_id, successHandled, subDomain, router]);

  if (!sessionDetails) return <Loader />;

  return (
    <Card className="max-w-2xl mx-auto mt-40">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-600">
          Payment Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg">
          Thank you for your purchase, {sessionDetails.customer.name}.
          You&apos;ll receive an email confirmation shortly.
        </p>
        <div>
          <h2 className="text-xl font-semibold mb-4">Ordered Items:</h2>
          <ul className="space-y-4">
            {sessionDetails.lineItems.data.map((item: any) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-muted rounded-lg"
              >
                <span>{item.description}</span>
                <span>
                  {item.quantity} x ${(item.amount_total / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-6">
        <span className="text-sm text-muted-foreground">
          Payment ID: {sessionDetails.orderData.paymentId}
        </span>
      </CardFooter>
    </Card>
  );
};

export default SuccessPage;
