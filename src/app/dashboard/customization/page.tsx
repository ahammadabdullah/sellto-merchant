// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/CustomButton";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

import { Palette } from "lucide-react";
import PageTitle from "@/components/dashboard/PageTitle";
import UploadFavicon from "./uploadFavicon";
import UploadImage from "./uploadImage";

export default async function Home() {
  return (
    <main className="p-8">
      <PageTitle Icon={Palette} title="Customization" />
      <div className="">
        <div className="font-clash">
          <h3 className="text-2xl">Store SEO</h3>
          <p className="opacity-65">
            Customize your store’s metadata title, description, favicon & link
            image
          </p>
          <div className="flex">
            <UploadFavicon />
            <UploadImage />
          </div>
        </div>
      </div>
    </main>
  );
}
