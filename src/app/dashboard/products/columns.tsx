"use client";

import Link from "next/link";
import Image from "next/image";

import { Copy, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/components/helpers/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/hooks/use-toast";
import { toast as SonnerToast } from "sonner";
import { dateFormatter, capitalizeFirstLetter } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Product = {
  id: number;
  product_name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  stock: number;
  shopId: string;
  price: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      const pd = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();

      return (
        <div className="flex flex-wrap gap-2 place-items-center">
          <Image
            src={pd?.image || "/path/to/fallback-image.jpg"}
            alt="img"
            width={40}
            height={40}
            objectFit="cover"
            className="max-w-[50px] aspect-square rounded"
          />
          <div className="flex flex-col">
            <div className="flex place-items-center gap-1">
              <h2 className="text-lg">{pd.product_name}</h2>

              <Button
                className="p-1 px-3"
                variant={"ghost"}
                size={"sm"}
                onClick={() => {
                  navigator.clipboard.writeText(pd.product_name).then(() => {
                    toast({
                      title: "Product name copied: ",
                      description: pd.product_name,
                    });
                  });
                }}
              >
                <Copy size={15} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              (created at{dateFormatter(pd.createdAt)})
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();

      return (
        <div className="font-medium">
          {value}{" "}
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              navigator.clipboard.writeText(value).then(() => {
                toast({ title: "ID Copied", description: "ID: " + value });
                // SonnerToast("ID Copied", {
                //   description: "ID: " + value,
                //   action: {
                //     label: "close",
                //     onClick: () => console.log("toast closed"),
                //   },
                // });
              });
            }}
          >
            <Copy size={15} />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const cell_value: string = row.getValue("type");
      return (
        <div className="text-muted-foreground text-base">
          {capitalizeFirstLetter(cell_value)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const cell_value: "unpublished" | "active" | "discontinued" =
        row.getValue("status");
      return (
        <div
          className={cn(
            "text-center p-[0.35rem] max-w-[115px] rounded font-bold ",
            cell_value === "unpublished" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`,
            cell_value === "active" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "discontinued" && `bg-[#FF5C5C]/20 text-[#FF5C5C]`
          )}
        >
          {cell_value}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("price"));
      return (
        <div className=" font-medium text-base">
          {value} <span className="text-muted-foreground opacity-80">USD</span>
        </div>
      );
    },
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="mr-[-2rem]  pr-0 max-w-[fit-content]">
          <Button
            className="text-muted-foreground hover:bg-muted-foreground/25"
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              console.log("link: /dashboard/products/" + rowData.id)
            }
          >
            <Pencil size={18} />
          </Button>
          <Button
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            variant={"ghost"}
            size={"icon"}
            onClick={() => console.log("link: api/product/dlt/" + rowData.id)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      );
    },
  },
];
