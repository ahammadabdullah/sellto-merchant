// import Image from "next/image";
import Link from "next/link";

// functions
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// components
import { Button } from "../ui/CustomButton";
import SectionTitle from "@/components/SecTitle";

// assets
// import img_global_map from "@/assets/home/global_map.png";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className="container py-24  sm:py-[7.5rem]">
      <div className="card_wrap flex flex-wrap gap-3 place-items-center justify-between p-20 max-[580px]:p-10 border rounded-lg relative overflow-hidden">
        <h1 className="font-clash min-[1400px]:text-8xl max-[550px]:text-6xl text-7xl font-medium">
          Take the <span className="text-primary2">leap.</span>
        </h1>
        <div className="right_wrap min-[1150px]:max-w-[38%]">
          <p className="pb-6 text-3xl max-[550px]:text-lg max-[750px]:text-xl max-w-[500px] opacity-85">
            get your very own digital store to reach customers like never
            before.
          </p>
          <Link href={"/"}>
            <Button className="px-7 font-medium ">Get started</Button>
          </Link>
        </div>
        <div className="gradient_wrap absolute w-full h-full  left-0 right-0 pointer-events-none">
          <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute right-[-50%] top-[-50%] opacity-90"></div>
          <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute left-[-30%] bottom-[-50%] opacity-90"></div>
        </div>
      </div>
    </section>
  );
}
