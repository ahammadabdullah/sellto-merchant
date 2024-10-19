import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// components
import { Button } from "../ui/CustomButton";
// import Circles from "@/components/waitlist/Ciecles";
// import SectionTitle from "@/components/SecTitle";
import PricingCard from "@/components/Pricing/PricingCard";

// assets
// import img_global_map from "@/assets/home/global_map.png";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className="container relative overflow-x-hidden mb-20 mt-[-7rem]">
      <div className="buttons_wrap flex flex-wrap gap-4 justify-center mb-14 ">
        <Button
          variant={"secondary"}
          className="relative !bg-secondary-foreground/25 border-none"
        >
          Monthly
          <div className="w-[200%] aspect-square rounded-full bg_white_radial_gradient absolute top-[50%] left-[50%] translate-y-[-52%] translate-x-[-50%] pointer-events-none"></div>
        </Button>
        <Button variant={"secondary"}>Yearly</Button>
        <Button variant={"secondary"}>Lifetime</Button>
      </div>
      <div className="card_wrap flex max-[870px]:flex-wrap gap-6">
        <PricingCard
          sub="For beginners"
          title="Starter"
          pricing="9.99"
        ></PricingCard>
        <PricingCard
          sub="For entrepreneurs"
          title="Pro"
          pricing="19.99"
          mostPopular={true}
        ></PricingCard>
        <PricingCard
          sub="For large businesses"
          title="Business"
          pricing="39.99"
        ></PricingCard>
      </div>
    </section>
  );
}
