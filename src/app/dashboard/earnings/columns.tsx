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
import { TableCell } from "@/components/ui/table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AllOrders = {
  id: string | number;
  createdAt: Date;
  status: string;
  amount: number;
  currency: string;
  link: string;
};

export const columns: ColumnDef<AllOrders>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value: any) =>
  //           table.toggleAllPageRowsSelected(!!value)
  //         }
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: true,
  //     enableHiding: false,
  //   },

  {
    accessorKey: "id",
    header: "#Transaction ID",
    size: 150,
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      return (
        <div className="font-medium truncate">
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
    size: 120,
    cell: ({ row }) => {
      const cell_value: Date = row.getValue("createdAt");
      return (
        <div className="flex flex-col">
          <p>{cell_value ? dateFormatter(cell_value) : "N/A"}</p>
          <p className="text-xs text-muted-foreground opacity-85">
            {cell_value ? timeAgo(cell_value) : "N/A"}
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
    size: 100,
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
            cell_value === "pending" && `bg-[#FFAE5C]/20 text-[#FFAE5C]`
          )}
        >
          {cell_value}
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="flex place-items-center justify-end mr-[-1.5rem]"
      />
    ),
    size: 100,
    cell: ({ row }) => {
      const rowData = row.original;
      const value =
        typeof rowData.amount === "number"
          ? rowData.amount.toFixed(2)
          : rowData.amount;
      return (
        <div className="">
          <div className="font-medium text-base text-right">
            {value}{" "}
            <span className="text-muted-foreground opacity-80">
              {rowData.currency ?? "USD"}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="min-[1450px]:mr-[-3rem]  pr-0 max-w-[fit-content] justify-end flex gap-2">
          <Button
            className="text-muted-foreground hover:bg-muted-foreground/25"
            variant={"ghost"}
            size={"icon"}
            asChild
          >
            <Link href={rowData.link} target="_blank">
              <SquareArrowOutUpRight />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
