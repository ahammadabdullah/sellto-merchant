"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { onboardingForm } from "@/schema/zod-schema";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadFileToApiRoute } from "@/lib/utils";
import { generateUploader } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { useUploadThing } from "@/lib/hooks";
import { FileEsque } from "uploadthing/types";
import { onboardingUser } from "@/actions/actions";
import useUser from "@/components/hooks/use-user";

// This is a mock list of currencies. In a real application, you'd fetch this from an API or database.
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
];
const initialState = {
  message: null as string | null,
  errors: {} as {
    email?: string[];
    shopName?: string[];
    shopLogo?: string[];
    subDomain?: string[];
    currency?: string[];
    description?: string[];
    productTypes?: string[];
  },
};
export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [state, setState] = useState(initialState);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const router = useRouter();

  if (!session?.user) {
    console.log(session?.user, "from onboarding form");
    router.push("/login");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(onboardingForm),
    defaultValues: {
      shopName: "",
      shopLogo: null,
      subDomain: "",
      currency: "",
      description: "",
      productTypes: "",
    },
  });
  const watchAllFields = watch();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError(err) {},
    onClientUploadComplete(res) {
      setImgUrl(res[0].url);
    },
  });
  const { refetch } = useUser();

  const onSubmit = async (data: z.infer<typeof onboardingForm>) => {
    if (data.shopLogo) {
      await startUpload([data.shopLogo]);
    }
    const formData = new FormData();
    formData.append("shopName", data.shopName);
    formData.append("shopLogo", imgUrl || "");
    formData.append("subDomain", data.subDomain);
    formData.append("currency", data.currency);
    formData.append("description", data.description || "");
    formData.append("productTypes", data.productTypes || "");
    const result = await onboardingUser(formData);
    console.log(result);
    if ("email" in result?.errors) {
      setState((prev) => ({
        ...prev,
        errors: result?.errors || {},
      }));
    }
    update({ shopId: result.data?.id });
    refetch();

    if (result?.redirectUrl) {
      router.push(result?.redirectUrl);
    }
    setState((prev) => ({
      ...prev,
      message: result?.message || null,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      //   @ts-ignore
      setValue("shopLogo", file);
    }
  };

  const nextStep = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await trigger("shopName");
        break;
      case 2:
        isValid = await trigger("subDomain");
        break;
      case 3:
        isValid = await trigger("currency");
        break;
      case 4:
        isValid = true; // No required fields in step 4
        break;
    }

    if (isValid) {
      setStep(step + 1);
      setProgress(progress + 25);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setProgress(progress - 25);
  };

  const generateSubdomain = () => {
    const shopName = watch("shopName");
    if (shopName) {
      const subdomain = shopName
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("subDomain", subdomain);
    }
  };

  const LabelClass = "ml-1 flex flex-wrap place-items-center gap-1 mb-2";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="">
        <h2 className="text-sm text-muted-foreground/80 mb-2">
          Step <span className="text-foreground">{step}</span> of 4
        </h2>
        <Progress value={progress} className="w-full h-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="min-h-[195px]">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="shopName" className={LabelClass}>
                  Shop Name
                  <p className="text-xs text-muted-foreground/80">
                    (max 15 characters)
                  </p>
                </Label>
                <Input id="shopName" {...register("shopName")} />
                {errors.shopName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shopName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="shopLogo" className={LabelClass}>
                  Shop Logo
                  <p className="text-xs text-muted-foreground/80">(optional)</p>
                </Label>
                <Input
                  id="shopLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {logoPreview && (
                  <div className="mt-2">
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="">
              <Label className={LabelClass} htmlFor="subDomain">
                Subdomain
                <p className="text-xs text-muted-foreground/80">
                  (max 15 characters)
                </p>
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center flex-1">
                  <Input
                    id="subDomain"
                    {...register("subDomain")}
                    className="rounded-r-none focus-visible:ring-0"
                  />
                  <span className="bg-muted px-3 py-2 rounded-r-md">
                    .sellto.io
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateSubdomain}
                >
                  Generate from name
                </Button>
              </div>
              {errors.subDomain && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subDomain.message}
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select onValueChange={(value) => setValue("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currency.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className={LabelClass}>
                  Short Description{" "}
                  <p className="text-xs text-muted-foreground/80">(optional)</p>
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <Label htmlFor="productTypes" className={LabelClass}>
                Product Types{" "}
                <p className="text-xs text-muted-foreground/80">(optional)</p>
              </Label>
              <Textarea
                id="productTypes"
                {...register("productTypes")}
                placeholder="Enter product types, separated by commas"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between ">
          {step > 1 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {step < 4 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 4 && <Button type="submit">Submit</Button>}
        </div>
      </form>
      {Object.keys(state.errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            {state?.errors?.email && <p>{state?.errors?.email}</p>}
          </AlertDescription>
        </Alert>
      )}
      {state.message && (
        <Alert variant="default">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
