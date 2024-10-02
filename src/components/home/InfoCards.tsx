import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// components
import { Button } from "../ui/button";
import Circles from "@/components/waitlist/Ciecles";
import SectionTitle from "@/components/SecTitle";
import InfoCard from "@/components/home/components/InfoCard";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className="container my-[7rem] ">
      <SectionTitle
        text1="Get started for free"
        text2="in minutes."
      ></SectionTitle>

      <div className="LargeInfoCardsWrapper flex flex-wrap gap-5 sm:gap-9 justify-center items-center mt-6">
        <InfoCard
          title="Sell"
          points={[
            "Software & keys",
            "Accounts",
            "Digital Assets",
            "Content & videos",
            "Discord roles",
            "Game powerups",
          ]}
          flip={true}
        ></InfoCard>
        <InfoCard
          title="Pay"
          points={[
            "PayPal",
            "One-time payments",
            "Promo codes",
            "Exclusive pricing",
            "55+ currencies",
            "Secure payment",
          ]}
          flip={true}
        ></InfoCard>
        <InfoCard
          title="Market"
          points={[
            "Rewards",
            "Ratings & reviews",
            "Referral program",
            "ticket system",
            "Automated blacklists",
            "Stock count",
          ]}
        ></InfoCard>
        <InfoCard
          title="Tools"
          points={[
            "Single sign-on (SSO)",
            "Analytics & graphs",
            "Invite team members",
            "Discord community",
            "Payment logs",
            "Auto Scheduler",
          ]}
        ></InfoCard>
      </div>
    </section>
  );
}
