"use client";

import Link from "next/link";

import { SquareArrowOutUpRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/components/helpers/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { dateFormatter } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RecentOrders = {
  id: string | number;
  userId: string | number;
  userName: string;
  createdAt: Date;
  productId: string | number;
  quantity: number;
  shopId: string;
  updatedAt: Date;
  status: string;
  revenue: number;
};

export const columns: ColumnDef<RecentOrders>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Customer Name"
        className="ml-2"
      />
    ),
    cell: ({ row }) => <div className="pl-4">{row.getValue("userName")}</div>,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time & Date" />
    ),
    cell: ({ row }) => {
      const cell_value: Date = row.getValue("createdAt");
      return <div className="">{dateFormatter(cell_value)}</div>;
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
