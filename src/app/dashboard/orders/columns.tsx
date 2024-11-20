"use client";

import Link from "next/link";

import { SquareArrowOutUpRight, ArrowUpDown, Trash2 } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/helpers/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn, timeAgo } from "@/lib/utils";
import { dateFormatter } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AllOrders = {
  id: string | number;
  customer_name: string;
  createdAt: Date;
  shopId: string;
  updatedAt: Date;
  status: string;
  revenue: number;
};

export const columns: ColumnDef<AllOrders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "customer_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer Name"
        className="ml-2"
      />
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        {row.getValue("customer_name")}{" "}
        <CopyButton
          copyContent={row.getValue("customer_name")}
          alertTitle="ID Copied:"
        ></CopyButton>
      </div>
    ),
  },

  {
    accessorKey: "id",
    header: "#Order ID",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      return (
        <div className="font-medium">
          {value}{" "}
          <CopyButton copyContent={value} alertTitle="ID Copied:"></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time & Date" />
    ),
    cell: ({ row }) => {
      const cell_value: Date = row.getValue("createdAt");
      return (
        <div className="flex flex-col">
          <p>{dateFormatter(cell_value)}</p>
          <p className="text-xs text-muted-foreground opacity-85">
            {timeAgo(cell_value)}
          </p>
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
      const cell_value:
        | "pending"
        | "completed"
        | "canceled"
        | "delivered"
        | "shipped" = row.getValue("status");

      return (
        <div
          className={cn(
            "text-center p-[0.35rem] max-w-[115px] rounded font-bold ",
            cell_value === "completed" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "canceled" && `bg-[#FF5C5C]/20 text-[#FF5C5C]`,
            cell_value === "pending" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`,
            cell_value === "delivered" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "shipped" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`
          )}
        >
          {cell_value}
        </div>
      );
    },
  },

  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Revenue"
        className="flex place-items-center justify-end mr-[-1.5rem]"
      />
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("revenue"));
      return (
        <div className="">
          <div className="font-medium text-base text-right">
            {value}{" "}
            <span className="text-muted-foreground opacity-80">USD</span>
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="min-[1450px]:mr-[-3rem]  pr-0 max-w-[fit-content] justify-end flex gap-2">
          <Button
            className="text-muted-foreground hover:bg-muted-foreground/25"
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              console.log("link: /dashboard/products/" + rowData.id)
            }
          >
            <SquareArrowOutUpRight />
          </Button>
          <Button
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            variant={"ghost"}
            size={"icon"}
            onClick={() => console.log("link: api/product/dlt/" + rowData.id)}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
