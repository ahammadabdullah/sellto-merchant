"use client";

import { useState } from "react";
import { PlusCircle, X, PackagePlus, FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhoneInput } from "@/components/ui/phone-input";
import { parseString } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface Variant {
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  currency: "";
  productType: "serials" | "service";
  customWarranty: boolean;
  warrantyTime: string;
  warrantyText: string;
  serials: string;
  perseadSerial: string[];
  serialParseMethod: "comma" | "newline";
  removeDuplicates: boolean;
  serviceDescription: string;
  unlimitedStock: boolean;
  stock: string;
  minQuantity: string;
  maxQuantity: string;
}
const currencies = [
  "USD", // United States Dollar
  "EUR", // Euro
  "JPY", // Japanese Yen
  "GBP", // British Pound
  "AUD", // Australian Dollar
  "CAD", // Canadian Dollar
  "CHF", // Swiss Franc
  "CNY", // Chinese Yuan
  "SEK", // Swedish Krona
  "NZD", // New Zealand Dollar
  "MXN", // Mexican Peso
  "SGD", // Singapore Dollar
  "HKD", // Hong Kong Dollar
  "NOK", // Norwegian Krone
  "KRW", // South Korean Won
  "TRY", // Turkish Lira
  "INR", // Indian Rupee
  "RUB", // Russian Ruble
  "BRL", // Brazilian Real
  "ZAR", // South African Rand
  "DKK", // Danish Krone
  "PLN", // Polish Zloty
  "THB", // Thai Baht
  "IDR", // Indonesian Rupiah
];

export function ProductForm() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [customDefaultWarranty, setCustomDefaultWarranty] = useState(false);

  const LabelClass = "ml-1 flex flex-wrap place-items-center gap-1 mb-2";
  const addVariant = () => {
    const newVariant: Variant = {
      name: "",
      shortDescription: "",
      description: "",
      price: "",
      currency: "",
      productType: "serials",
      customWarranty: false,
      warrantyTime: "",
      warrantyText: "",
      serials: "",
      perseadSerial: [],
      serialParseMethod: "comma",
      removeDuplicates: false,
      serviceDescription: "",
      unlimitedStock: true,
      stock: "",
      minQuantity: "",
      maxQuantity: "",
    };
    setVariants([...variants, newVariant]);
    setSelectedVariant(variants.length);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
    if (selectedVariant === index) {
      setSelectedVariant(null);
    } else if (selectedVariant !== null && selectedVariant > index) {
      setSelectedVariant(selectedVariant - 1);
    }
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string | boolean
  ) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  //   handles serial text chnage
  const handleSerialTextAreaChange = ({
    index,
    field = "serials",
    perseadSerialField = "perseadSerial",
    stockKey = "stock",
    value,
    persingMethod,
  }: {
    index: number;
    field?: keyof Variant;
    perseadSerialField?: keyof Variant;
    stockKey?: keyof Variant;
    value: string;
    persingMethod: "newline" | "comma";
  }) => {
    const parsedString = parseString(value, persingMethod);
    // console.log(parseString(value, persingMethod, rvmDuplicates, true));
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
      [perseadSerialField]: parsedString,
      [stockKey]: parsedString.length,
    };
    setVariants(newVariants);
  };
  const handleRmvDuplicateSerials = ({
    index,
    field = "serials",
    perseadSerialField = "perseadSerial",
    stockKey = "stock",
  }: {
    index: number;
    field?: keyof Variant;
    perseadSerialField?: keyof Variant;
    stockKey?: keyof Variant;
  }) => {
    const parsedStringArray = parseString(
      variants[index].serials,
      variants[index].serialParseMethod
    );
    const parsedString = parseString(
      variants[index].serials,
      variants[index].serialParseMethod,
      true,
      true
    );
    // console.log(parseString(value, persingMethod, rvmDuplicates, true));
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: parsedString,
      [stockKey]: parsedStringArray.length,
      [perseadSerialField]: parsedStringArray,
    };
    setVariants(newVariants);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      <div className="space-y-6 bg-background rounded p-6 md:p-8 border">
        <div className="flex gap-2 place-items-center">
          <div className="h-8 w-1 bg-primary"></div>
          <h2 className="text-2xl font-semibold">Defaults & General detials</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-2 ">
          <div className="space-y-6 bg-muted/30 p-6 rounded-md">
            <div>
              <Label className={LabelClass} htmlFor="productName">
                Product Name
                <p className="text-xs text-muted-foreground/80">
                  (max 55 characters)
                </p>
              </Label>
              <Input id="productName" placeholder="Enter the product name" />
            </div>
            <div>
              <Label className={LabelClass} htmlFor="shortDescription">
                Short Description
                <p className="text-xs text-muted-foreground/80">
                  (max 85 characters)
                </p>
              </Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief overview of the product"
              />
            </div>
            <div>
              <Label className={LabelClass} htmlFor="fullDescription">
                Full Description
                <p className="text-xs text-muted-foreground/80">
                  (max 200 characters)
                </p>
              </Label>
              <Textarea
                id="fullDescription"
                placeholder="Detailed description of the product"
                rows={6}
              />
            </div>
            <div className="flex flex-wrap place-items-center gap-4 justify-between">
              <div>
                <Label className={LabelClass} htmlFor="defaultPrice">
                  Default Price
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="defaultPrice"
                    type="number"
                    placeholder="0000"
                    className="max-w-[220px]"
                  />
                  <Select>
                    <SelectTrigger id="visibility" className="max-w-[80px]">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-72">
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label className={LabelClass} htmlFor="custom-default-warranty">
                  Custom warranty for default variant
                </Label>
                <Switch
                  id="custom-default-warranty"
                  checked={customDefaultWarranty}
                  onCheckedChange={setCustomDefaultWarranty}
                />
              </div>
            </div>

            {customDefaultWarranty && (
              <>
                <div className="max-w-[208px]">
                  <Label className={LabelClass} htmlFor="defaultWarrantyTime">
                    Custom warranty Time
                  </Label>
                  <Input
                    id="defaultWarrantyTime"
                    placeholder="e.g., 1 year, 6 months"
                  />
                </div>
                <div>
                  <Label className={LabelClass} htmlFor="defaultWarrantyText">
                    Custom warranty Text
                  </Label>
                  <Textarea
                    id="defaultWarrantyText"
                    placeholder="Describe the warranty terms"
                    rows={2}
                  />
                </div>
              </>
            )}
          </div>
          <div className="space-y-6 bg-muted/30 p-6 rounded-md">
            <div>
              <Label className={LabelClass} htmlFor="productImage">
                Product Image
                <p className="text-xs text-muted-foreground/80">
                  (1920x1080px / 16:9)
                </p>
              </Label>
              <div className="aspect-[19/9] border-2 border-dashed rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center text-muted-foreground p-2">
                  <FileUp
                    size={55}
                    className="opacity-65 pb-3 text-muted-foreground"
                  />
                  <span className=" text-sm p-2 text-center leading-4 mb-1">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs opacity-65">
                    svg, png, jps or gif
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Label className={LabelClass} htmlFor="visibility">
                Visibility status
              </Label>
              <Select>
                <SelectTrigger id="visibility">
                  <SelectValue placeholder="Select product visibility" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem
                    value="unpublished"
                    className="opacity-65 focus:opacity-100 bg-[#FFAE5C]/20 text-[#FFAE5C] focus:bg-[#FFAE5C]/30 focus:text-[#ffa54a] mb-1"
                  >
                    Unpublished
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="opacity-65 focus:opacity-100 bg-[#1ED760]/20 text-[#1ED760] focus:bg-[#1ED760]/30 focus:text-[#3ec56d] mb-1"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="discontinued"
                    className="opacity-65 focus:opacity-100 bg-[#FF5C5C]/20 text-[#FF5C5C] focus:bg-[#FF5C5C]/30 focus:text-[#ff4d4d]"
                  >
                    Discontinuedt
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 bg-background rounded p-6 md:p-8  border">
        <div className="flex flex-wrap items-center gap-4 ">
          <div className="flex gap-2 place-items-center">
            <div className="h-8 w-1 bg-primary"></div>
            <h2 className="text-2xl font-semibold">Variants</h2>
          </div>

          <Button onClick={addVariant} type="button" variant={"secondary"}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          {variants.map((variant, index) => (
            <Card
              key={index}
              className={`cursor-pointer basis-[250px] transition-all  ${
                selectedVariant === index
                  ? "border-primary bg-muted-foreground/20 scale-105"
                  : "border-transparent bg-muted scale-1"
              }`}
              onClick={() => setSelectedVariant(index)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Variant {index + 1}: {variant.name || "Unnamed"}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVariant(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Price: ${variant.price || "0"} | Stock:{" "}
                  {variant.unlimitedStock ? "Unlimited" : variant.stock || "0"}{" "}
                  | Type: {variant.productType}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedVariant !== null && (
          <Card className="mt-6 border-none bg-muted/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Editing Variant {selectedVariant + 1}
                {variants[selectedVariant]?.name &&
                  ": " + variants[selectedVariant].name}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label
                    className={LabelClass}
                    htmlFor={`variantName-${selectedVariant}`}
                  >
                    Variant Name
                  </Label>
                  <Input
                    id={`variantName-${selectedVariant}`}
                    placeholder="Enter variant name"
                    value={variants[selectedVariant].name}
                    onChange={(e) =>
                      handleVariantChange(
                        selectedVariant,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    className={LabelClass}
                    htmlFor={`variantShortDesc-${selectedVariant}`}
                  >
                    Short Description
                  </Label>
                  <Input
                    id={`variantShortDesc-${selectedVariant}`}
                    placeholder="Brief description of the variant"
                    value={variants[selectedVariant].shortDescription}
                    onChange={(e) =>
                      handleVariantChange(
                        selectedVariant,
                        "shortDescription",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    className={LabelClass}
                    htmlFor={`variantDesc-${selectedVariant}`}
                  >
                    Description
                  </Label>
                  <Textarea
                    id={`variantDesc-${selectedVariant}`}
                    placeholder="Detailed description of the variant"
                    rows={3}
                    value={variants[selectedVariant].description}
                    onChange={(e) =>
                      handleVariantChange(
                        selectedVariant,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <div className="flex flex-wrap place-items-center gap-4 justify-between">
                    <div>
                      <Label
                        className={LabelClass}
                        htmlFor={`variantPrice-${selectedVariant}`}
                      >
                        Price
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`variantPrice-${selectedVariant}`}
                          value={variants[selectedVariant].price}
                          type="number"
                          placeholder="0000"
                          className="max-w-[220px]"
                          onChange={(e) =>
                            handleVariantChange(
                              selectedVariant,
                              "price",
                              e.target.value
                            )
                          }
                        />
                        <Select>
                          <SelectTrigger
                            id="visibility"
                            className="max-w-[80px]"
                          >
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <ScrollArea className="h-72">
                              {currencies.map((currency) => (
                                <SelectItem key={currency} value={currency}>
                                  {currency}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label
                    className={LabelClass}
                    htmlFor={`productType-${selectedVariant}`}
                  >
                    Product Type
                  </Label>
                  <Select
                    value={variants[selectedVariant].productType}
                    onValueChange={(value) =>
                      handleVariantChange(
                        selectedVariant,
                        "productType",
                        value as "serials" | "service"
                      )
                    }
                  >
                    <SelectTrigger id={`productType-${selectedVariant}`}>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serials">Serials</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {variants[selectedVariant].productType === "serials" && (
                  <div className=" md:col-span-2  mt-6 mb-10  flex flex-wrap gap-6 place-content-start">
                    <div className="basis-[500px] grow">
                      <Label
                        className={LabelClass}
                        htmlFor={`serials-${selectedVariant}`}
                      >
                        Serials
                      </Label>
                      <Textarea
                        id={`serials-${selectedVariant}`}
                        placeholder="Enter serials (comma or new line separated)"
                        rows={8}
                        value={variants[selectedVariant].serials}
                        onChange={(e) => {
                          handleSerialTextAreaChange({
                            index: selectedVariant,
                            persingMethod:
                              variants[selectedVariant].serialParseMethod,
                            value: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label
                          className={LabelClass}
                          htmlFor={`serialParseMethod-${selectedVariant}`}
                        >
                          Serial Parse Method
                        </Label>
                        <Select
                          value={variants[selectedVariant].serialParseMethod}
                          onValueChange={(value) =>
                            handleVariantChange(
                              selectedVariant,
                              "serialParseMethod",
                              value as "comma" | "newline"
                            )
                          }
                        >
                          <SelectTrigger
                            id={`serialParseMethod-${selectedVariant}`}
                          >
                            <SelectValue placeholder="Select parse method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comma">Comma</SelectItem>
                            <SelectItem value="newline">New Line</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* bug: the button needs to pressed twice to change the stock count */}
                        <Button
                          className="w-full"
                          variant={"secondary"}
                          onClick={() =>
                            handleRmvDuplicateSerials({
                              index: selectedVariant,
                            })
                          }
                        >
                          Remove Duplicates
                        </Button>
                      </div>
                      <div>
                        <Label
                          className={LabelClass}
                          htmlFor={`stock-${selectedVariant}`}
                        >
                          Stock
                        </Label>
                        <Input
                          id={`stock-${selectedVariant}`}
                          type="number"
                          disabled
                          placeholder="Enter available stock"
                          value={variants[selectedVariant].stock}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {variants[selectedVariant].productType === "service" && (
                  <div className="md:col-span-2  mt-6 mb-8 flex flex-wrap gap-6 place-content-start">
                    <div className="grow">
                      <Label
                        className={LabelClass}
                        htmlFor={`serviceDescription-${selectedVariant}`}
                      >
                        Service Description
                      </Label>
                      <Textarea
                        id={`serviceDescription-${selectedVariant}`}
                        placeholder="Describe the service offered"
                        rows={4}
                        value={variants[selectedVariant].serviceDescription}
                        onChange={(e) =>
                          handleVariantChange(
                            selectedVariant,
                            "serviceDescription",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="mt-5 space-y-3 basis-[200px]">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`unlimited-stock-${selectedVariant}`}
                          checked={variants[selectedVariant].unlimitedStock}
                          onCheckedChange={(checked) =>
                            handleVariantChange(
                              selectedVariant,
                              "unlimitedStock",
                              checked
                            )
                          }
                        />
                        <Label
                          className={LabelClass}
                          htmlFor={`unlimited-stock-${selectedVariant}`}
                        >
                          Unlimited Stock
                        </Label>
                      </div>
                      {!variants[selectedVariant].unlimitedStock && (
                        <div className="max-w-[190px]">
                          <Label
                            className={LabelClass}
                            htmlFor={`stock-${selectedVariant}`}
                          >
                            Stock
                          </Label>
                          <Input
                            id={`stock-${selectedVariant}`}
                            type="number"
                            placeholder="Enter stock number"
                            value={variants[selectedVariant].stock}
                            onChange={(e) =>
                              handleVariantChange(
                                selectedVariant,
                                "stock",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <Label
                    className={LabelClass}
                    htmlFor={`minQuantity-${selectedVariant}`}
                  >
                    Minimum Quantity{" "}
                    <p className="text-xs text-muted-foreground/80">
                      (Optional)
                    </p>
                  </Label>
                  <Input
                    id={`minQuantity-${selectedVariant}`}
                    type="number"
                    placeholder="00"
                    value={variants[selectedVariant].minQuantity}
                    onChange={(e) =>
                      handleVariantChange(
                        selectedVariant,
                        "minQuantity",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    className={LabelClass}
                    htmlFor={`maxQuantity-${selectedVariant}`}
                  >
                    Maximum Quantity
                    <p className="text-xs text-muted-foreground/80">
                      (Optional)
                    </p>
                  </Label>
                  <Input
                    id={`maxQuantity-${selectedVariant}`}
                    type="number"
                    placeholder="00"
                    value={variants[selectedVariant].maxQuantity}
                    onChange={(e) =>
                      handleVariantChange(
                        selectedVariant,
                        "maxQuantity",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`custom-warranty-${selectedVariant}`}
                    checked={variants[selectedVariant].customWarranty}
                    onCheckedChange={(checked) =>
                      handleVariantChange(
                        selectedVariant,
                        "customWarranty",
                        checked
                      )
                    }
                  />
                  <Label
                    className={LabelClass}
                    htmlFor={`custom-warranty-${selectedVariant}`}
                  >
                    Custom Warranty
                  </Label>
                </div>
                {variants[selectedVariant].customWarranty && (
                  <>
                    <div className="max-w-[215px]">
                      <Label
                        className={LabelClass}
                        htmlFor={`warrantyTime-${selectedVariant}`}
                      >
                        Warranty Time
                      </Label>
                      <Input
                        id={`warrantyTime-${selectedVariant}`}
                        placeholder="e.g., 2 years, 18 months"
                        value={variants[selectedVariant].warrantyTime}
                        onChange={(e) =>
                          handleVariantChange(
                            selectedVariant,
                            "warrantyTime",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label
                        className={LabelClass}
                        htmlFor={`warrantyText-${selectedVariant}`}
                      >
                        Warranty Text
                      </Label>
                      <Textarea
                        id={`warrantyText-${selectedVariant}`}
                        placeholder="Describe the warranty terms for this variant"
                        value={variants[selectedVariant].warrantyText}
                        onChange={(e) =>
                          handleVariantChange(
                            selectedVariant,
                            "warrantyText",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Button className="fixed  z-20 top-16 right-8 shadow-xl px-6 hover:translate-y-[-5px] transition-transform">
        Add product <PackagePlus className="ml-2" />
      </Button>
    </form>
  );
}
