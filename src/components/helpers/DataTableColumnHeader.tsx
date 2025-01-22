import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  EyeOff,
  LucideIcon,
} from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  hideButton?: boolean;
  ICON1?: LucideIcon;
  ICON2?: LucideIcon;
  text1?: string;
  text2?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  hideButton,
  ICON1 = ArrowUpIcon,
  ICON2 = ArrowDownIcon,
  text1 = "Asc",
  text2 = "Desc",
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // Function to handle click cycling through sort states
  const handleSortClick = () => {
    const currentSort = column.getIsSorted();
    if (currentSort === false) {
      // First click - sort ascending
      column.toggleSorting(false);
    } else if (currentSort === "asc") {
      // Second click - sort descending
      column.toggleSorting(true);
    } else {
      // Third click - clear sorting
      column.clearSorting();
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={handleSortClick}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ICON2 className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ICON1 className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
      {hideButton && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
