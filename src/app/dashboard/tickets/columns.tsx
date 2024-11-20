"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Trash2,
  MessageCircleReply,
  MessageCircleMore,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/CopyButton";

import { DataTableColumnHeader } from "@/components/helpers/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import { cn, getFormattedDate, getTimeFromDate } from "@/lib/utils";

import { truncateString } from "@/lib/utils";

interface Messages {
  id: number | string;
  content: string;
  email: string;
  createdAt: Date;
}

export type TicketsList = {
  id: number | string;
  subject: string;
  email: string;
  status: string;
  messages: Messages[];
  createdAt: Date;
};
export const columns: ColumnDef<TicketsList>[] = [
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
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      //   const pd = row.original;
      const value: string = row.getValue("subject");

      return <div className="">{truncateString(value, 15)}</div>;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const value: string = row.getValue("email");
      return (
        <div className="font-medium">
          {value} <CopyButton copyContent={value}></CopyButton>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "#TicketID",
    cell: ({ row }) => {
      const value: string = row.getValue("id");
      return (
        <div className="font-medium">
          {value} <CopyButton copyContent={value}></CopyButton>
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
      return <div className="">{getFormattedDate(cell_value)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const cell_value: "open" | "closed" = row.getValue("status");
      return (
        <div
          className={cn(
            "text-center p-[0.35rem] max-w-[115px] rounded font-bold ",
            cell_value === "open" && `bg-[#1ED760]/20 text-[#1ED760]`,
            cell_value === "closed" && `bg-[#FF5C5C]/20 text-[#FF5C5C]`
          )}
        >
          {cell_value}
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
          <Link href={` /dashboard/tickets/chat/${rowData.id}`}>
            <Button
              className="text-muted-foreground hover:bg-muted-foreground/25"
              variant={"ghost"}
              size={"icon"}
              onClick={() =>
                console.log("link: /dashboard/tickets/chat/" + rowData.id)
              }
            >
              {rowData.status === "open" && <MessageCircleReply size={22} />}
              {rowData.status === "closed" && <MessageCircle size={22} />}
            </Button>
          </Link>
          <Button
            className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            variant={"ghost"}
            size={"icon"}
            onClick={() => console.log("link: api/product/dlt/" + rowData.id)}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      );
    },
  },
];
