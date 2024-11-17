"use client";
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

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getShop, updateShop } from "@/actions/actions";
import { useUploadThing } from "@/lib/hooks";
import ToastNotifier from "@/components/helpers/ToastNotifier";
import { useRouter } from "next/navigation";

type ShopData = {
  name?: string;
  subTitle?: string;
  description?: string;
  favicon?: string;
  image?: string;
};
const initialState = {
  message: null as string | null,
  errors: {},
};

export default function Home() {
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [state, setState] = useState<typeof initialState>(initialState);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const [shopData, setShopData] = useState<ShopData>({});
  const shopId = session?.user?.shopId;
  useEffect(() => {
    if (shopId) {
      const fetchData = async () => {
        const res = await getShop(shopId);
        setShopData(res as ShopData);
      };
      fetchData();
    }
  }, [shopId]);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let faviconUrl: string | null = null;
    let imageUrl: string | null = null;

    const filesToUpload: File[] = [];
    if (faviconFile) filesToUpload.push(faviconFile);
    if (imageFile) filesToUpload.push(imageFile);
    if (filesToUpload.length > 0) {
      const res = await startUpload(filesToUpload);

      if (res && Array.isArray(res)) {
        res.forEach((upload) => {
          if (faviconFile && upload.name === faviconFile.name) {
            faviconUrl = upload.url || upload.appUrl;
          }
          if (imageFile && upload.name === imageFile.name) {
            imageUrl = upload.url || upload.appUrl;
          }
        });
      }
    }

    if (faviconUrl) formData.set("favicon", faviconUrl);
    if (imageUrl) formData.set("image", imageUrl);

    if (!shopId) {
      console.error("Shop ID is undefined");
      setLoading(false);
      return;
    }
    const result = await updateShop(shopId, formData);
    if (
      "error" in result?.errors ||
      "name" in result?.errors ||
      "subTitle" in result?.errors ||
      "description" in result?.errors ||
      "favicon" in result?.errors ||
      "image" in result?.errors
    ) {
      setState((prev) => ({
        ...prev,
        errors: result?.errors || {},
      }));
    }
    if (result?.redirectUrl) {
      router.push(result?.redirectUrl);
    }
    setState((prev) => ({
      ...prev,
      message: result?.message || null,
    }));
    setLoading(false);
  };

  return (
    <main className="p-8">
      <PageTitle Icon={Palette} title="Customization" />
      <div className="p-6 border bg-background rounded-lg max-w-[1080px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-wrap place-items-center justify-between">
            <div className="text_wrap">
              <h3 className="text-2xl font-clash font-medium">Store SEO</h3>
              <p className="opacity-80 text-muted-foreground">
                Customize your store’s metadata title, description, favicon &
                link image
              </p>
            </div>
            <Button type="submit" loading={loading}>
              Save changes
            </Button>
          </div>
          <div className="flex flex-wrap justify-between gap-8">
            <UploadFavicon
              setFaviconFile={setFaviconFile}
              favicon={shopData.favicon}
            />
            <UploadImage
              className="grow"
              setImageFile={setImageFile}
              image={shopData.image}
            />
          </div>
          <div className="w-full mt-8 flex flex-col gap-8">
            <InputWithLable
              readOnly={true}
              name="name"
              defaultValue={shopData?.name}
              id="shop_name"
              title="Shop name"
              sub_title="(max 15 characters)"
              maxLength={15}
              placeholder="Your shop name"
            />
            <InputWithLable
              name="subTitle"
              defaultValue={shopData?.subTitle || ""}
              id="shop_heading"
              title="Heading"
              sub_title="(max 30 characters)"
              maxLength={30}
              placeholder="Some awsome heading.."
            />
            <InputWithLable
              name="description"
              defaultValue={shopData?.description || ""}
              id="shop_description"
              title="Description"
              sub_title="(max 150 characters)"
              maxLength={150}
              placeholder="A short description about your shop"
              textarea={true}
              inputClassName="min-h-[100px]"
            />
          </div>
        </form>
      </div>
      <ToastNotifier state={state} setState={setState} />
    </main>
  );
}
