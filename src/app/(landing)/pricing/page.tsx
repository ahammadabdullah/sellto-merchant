import PageHeading from "@/components/home/components/PageHeading";
import PricingSec from "@/components/home/Pricing/PricingSec";

import { ReactLenisProvider } from "@/components/helpers/LenisProvider";

export default function Home() {
  return (
    <ReactLenisProvider>
      <main className="w-full flex flex-col min-h-[100dvh] overflow-hidden">
        <PageHeading
          sub="Pricing"
          text1="Boost your business without"
          text2=" breaking your bank."
        ></PageHeading>
        <PricingSec></PricingSec>
      </main>
    </ReactLenisProvider>
  );
}
