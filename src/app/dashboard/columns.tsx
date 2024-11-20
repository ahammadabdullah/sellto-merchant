"use client";

import Link from "next/link";

import { SquareArrowOutUpRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/components/helpers/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn, timeAgo } from "@/lib/utils";
import { dateFormatter } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RecentOrders = {
  id: string | number;
  customer_name: string;
  shopId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  revenue: number;
  paymentId: string;
  productIds: string[];
  variantIds: string[];
  quantities: number[];
  productNames: string[];
};

export const columns: ColumnDef<RecentOrders>[] = [
  {
    accessorKey: "customer_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer Name"
        className="ml-2"
      />
    ),
    cell: ({ row }) => {
      let name: string = row.getValue("customer_name");
      return (
        <div className="pl-4">
          {name}{" "}
          <CopyButton copyContent={name} alertTitle="Name Copied:"></CopyButton>
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
    accessorKey: "id",
    header: "#Order ID",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      return (
        <div className="font-medium">
          {value}
          <CopyButton copyContent={value} alertTitle="ID Copied:"></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Revenue" />
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("revenue"));
      return (
        <div className="font-medium text-base">
          <span className="text-primary2">$</span> {value}{" "}
          <span className="text-muted-foreground opacity-80">USD</span>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-right mr-[-2.5rem]  max-w-[60px]"></div>,
    cell: ({ row }) => {
      const value: string = row.getValue("id");

      return (
        <Link
          href={`/dashboard/orders/${value}`}
          className="text-muted-foreground text-right mr-[-2.5rem] max-w-[60px]"
        >
          <Button variant={"ghost"}>
            <SquareArrowOutUpRight />
          </Button>
        </Link>
      );
    },
  },
];
