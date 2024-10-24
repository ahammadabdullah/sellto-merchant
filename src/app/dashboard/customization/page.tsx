// import { cookies } from "next/headers";
// libraries
// import gsap from "gsap";
import Image from "next/image";

// components
import { Button } from "@/components/ui/button";
import { InputWithLable } from "./InputWithLable";
// import ResizableHandle from "@/components/dashboard/root/ResizableLayout";

import { Palette } from "lucide-react";
import PageTitle from "@/components/dashboard/PageTitle";
import UploadFavicon from "./uploadFavicon";
import UploadImage from "./uploadImage";
import { Input } from "@/components/ui/input";
export default async function Home() {
  return (
    <main className="p-8">
      <PageTitle Icon={Palette} title="Customization" />
      <div className="p-6 border bg-background rounded-lg max-w-[1080px]">
        <div className="mb-6 flex flex-wrap place-items-center justify-between">
          <div className="text_wrap">
            <h3 className="text-2xl font-clash font-medium">Store SEO</h3>
            <p className="opacity-80 text-muted-foreground">
              Customize your store’s metadata title, description, favicon & link
              image
            </p>
          </div>
          <Button>Save changes</Button>
        </div>
        <div className="flex flex-wrap justify-between gap-8">
          <UploadFavicon />
          <UploadImage className="grow" />
        </div>
        <div className="w-full mt-8 flex flex-col gap-8">
          <InputWithLable
            id="shop_name"
            title="Shop name"
            sub_title="(max 15 characters)"
            maxLength={15}
            placeholder="Your shop name"
          />
          <InputWithLable
            id="shop_heading"
            title="Heading"
            sub_title="(max 30 characters)"
            maxLength={30}
            placeholder="Some awsome heading.."
          />
          <InputWithLable
            id="shop_description"
            title="Description"
            sub_title="(max 150 characters)"
            maxLength={150}
            placeholder="A short description about your shop"
            textarea={true}
            inputClassName="min-h-[100px]"
          />
        </div>
      </div>
    </main>
  );
}
