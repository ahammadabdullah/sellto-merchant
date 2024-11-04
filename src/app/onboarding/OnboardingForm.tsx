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

// This is a mock list of currencies. In a real application, you'd fetch this from an API or database.
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
];

const formSchema = z.object({
  shopName: z
    .string()
    .min(1, "Shop name is required")
    .max(15, "Max 15 characters"),
  shopLogo: z.any().optional(),
  subDomain: z
    .string()
    .min(1, "Subdomain is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Subdomain can only contain letters, numbers, and hyphens"
    ),
  currency: z.string().min(1, "Currency is required"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  productTypes: z.string().optional(),
});

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
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
      <Progress value={progress} className="w-full" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <Label htmlFor="shopLogo">Shop Logo (optional)</Label>
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
              <Label htmlFor="description">Short Description (optional)</Label>
              <Textarea id="description" {...register("description")} />
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
            <Label htmlFor="productTypes">Product Types (optional)</Label>
            <Textarea
              id="productTypes"
              {...register("productTypes")}
              placeholder="Enter product types, separated by commas"
            />
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
}
