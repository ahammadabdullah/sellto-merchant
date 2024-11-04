import Image from "next/image";
import Link from "next/link";
import OnboardingForm from "./OnboardingForm";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <main className="relative">
      <div className=" mx-auto py-10 min-h-screen flex flex-col justify-center relative ">
        <Nav className="max-w-[120px] sm:max-w-[150px] w-full" />
        {/* <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <Image
          src="/store-left.png"
          alt="Decorative left"
          width={200}
          height={400}
          className="opacity-50"
        />
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <Image
          src="/store-right.png"
          alt="Decorative right"
          width={200}
          height={400}
          className="opacity-50"
        />
      </div> */}
        <div className="flex flex-col justify-center items-center mb-6 gap-3 px-4">
          <h1 className="text-3xl font-medium  text-center font-clash">
            Setting up your shop...
          </h1>
          <Button variant={"outline"} className="w-full max-w-[310px]" asChild>
            <Link href={"/"}>Go back home</Link>
          </Button>
        </div>

        <div>
          <OnboardingForm />
        </div>
      </div>
      <div className="w-full h-full fixed right-0 bottom-0 pointer-events-none">
        <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute right-[-40%] top-0 max-[1200px]:top-[90%]  pointer-events-none z-[-3] opacity-70"></div>
        <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute left-[-40%] bottom-0 max-[1200px]:bottom-[90%]  pointer-events-none z-[-3] opacity-70"></div>
      </div>
    </main>
  );
}
