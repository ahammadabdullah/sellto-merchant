"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

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
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSessionDetails();
  }, [session_id]);
  console.log(sessionDetails, "sessionDetails");
  const productData = JSON.parse(sessionDetails.session.metadata.productData);
  console.log(productData, "productData");
  if (!sessionDetails) return <div>Loading payment details...</div>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase, {sessionDetails.customerEmail}.</p>
      <h2>Ordered Items:</h2>
      <ul>
        {sessionDetails.lineItems.data.map((item: any) => (
          <li key={item.id}>
            {item.description} - {item.quantity} x ${item.amount_total / 100}
          </li>
        ))}
        <span>payment id: {sessionDetails.paymentIntent.id}</span>
      </ul>
    </div>
  );
};

export default SuccessPage;
