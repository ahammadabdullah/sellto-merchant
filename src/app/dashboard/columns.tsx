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
  empty: " ";
  id: string;
  customer_name: string;
  time_date: number;
  status: "Pending" | "Completed" | "Canceled";
  revenue: number;
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
    cell: ({ row }) => (
      <div className="pl-4">{row.getValue("customer_name")}</div>
    ),
  },
  {
    accessorKey: "empty",
    header: () => <div className=""></div>,
  },

  {
    accessorKey: "time_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time & Date" />
    ),
    cell: ({ row }) => {
      const cell_value: number = row.getValue("time_date");
      // console.log(cell_value);
      return <div className="">{dateFormatter(cell_value)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const cell_value: "Pending" | "Completed" | "Canceled" =
        row.getValue("status");
      // let color = "#FFAE5C";
      // if (cell_value === "Completed") color = "#1ED760";
      // if (cell_value === "Canceled") color = "#FF5C5C";

      return (
        <div
          className={cn(
            "text-center p-[0.35rem] max-w-[115px] rounded font-bold ",
            cell_value === "Completed" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "Canceled" && `bg-[#FF5C5C]/20 text-[#FF5C5C]`,
            cell_value === "Pending" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`
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
