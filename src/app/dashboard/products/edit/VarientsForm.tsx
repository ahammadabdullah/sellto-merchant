// import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const LabelClass = "ml-1 flex flex-wrap place-items-center gap-1 mb-2";
import { Variant } from "./EditProduct";

type VarientsFormProps = {
  selectedVariant: number;
  variants: Variant[];
  handleVariantChange: (
    index: number,
    field: keyof Variant,
    value: string | boolean
  ) => void;
  handleSerialTextAreaChange: ({
    index,
    parsingMethod,
    value,
  }: {
    index: number;
    value: string;
    parsingMethod: "comma" | "newline";
  }) => void;
  handleRmvDuplicateSerials: ({ index }: { index: number }) => void;
  currencies: string[];
};

export const VarientsForm = ({
  selectedVariant,
  variants,
  handleVariantChange,
  handleSerialTextAreaChange,
  handleRmvDuplicateSerials,
  currencies,
}: VarientsFormProps) => {
  return (
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
                handleVariantChange(selectedVariant, "name", e.target.value)
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
                      parsingMethod:
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
                    <SelectTrigger id={`serialParseMethod-${selectedVariant}`}>
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
              <p className="text-xs text-muted-foreground/80">(Optional)</p>
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
              <p className="text-xs text-muted-foreground/80">(Optional)</p>
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
                handleVariantChange(selectedVariant, "customWarranty", checked)
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
  );
};
