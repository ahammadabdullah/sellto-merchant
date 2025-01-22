import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export interface classProps {
  className?: string;
  title: string;
  icon?: any;
  value: string;
  description: string;
}

export default function LargeInfoCard({
  className,
  title,
  icon,
  value,
  description,
}: classProps) {
  return (
    <Card
      className={cn(
        "bg-background grow rounded-md relative overflow-hidden min-[290px]:min-w-[280px]",
        className
      )}
    >
      <CardHeader>
        <p className="text-sm opacity-80">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1">
          <h1 className="text-xl sm:text-3xl font-clash font-medium ">
            <span className="text-primary2">$</span> {value}
          </h1>
        </div>
      </CardContent>
      <CardFooter className="opacity-80 text-sm">{description}</CardFooter>
    </Card>
  );
}
