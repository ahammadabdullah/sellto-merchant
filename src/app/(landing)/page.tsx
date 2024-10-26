// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";
import LargeInfoCardsSec from "@/components/home/LargeInfoCardsSec";
import InfoCardsSec from "@/components/home/InfoCards";
import GlobalMap from "@/components/home/globalMap";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <ReactLenisProvider>
      <main className="w-full">
        <Hero />
        <LargeInfoCardsSec></LargeInfoCardsSec>
        <InfoCardsSec></InfoCardsSec>
        <GlobalMap></GlobalMap>
        <Testimonials></Testimonials>
        <CTABanner></CTABanner>
      </main>
    </ReactLenisProvider>
  );
}
