import * as React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const InputWithLable = ({
  id,
  title,
  sub_title,
  className,
  inputClassName,
  type = "text",
  maxLength,
  placeholder = "Your details...",
  textarea,
  ...props
}: {
  id: string;
  title: string;
  sub_title?: string;
  className?: string;
  inputClassName?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  textarea?: boolean;
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap place-items-center gap-1 mb-2">
        <Label htmlFor={id}>{title}</Label>
        <p className="text-xs text-muted-foreground">{sub_title}</p>
      </div>
      {textarea ? (
        <Textarea
          placeholder={placeholder}
          maxLength={maxLength}
          {...props}
          id={id}
          className={cn(inputClassName)}
        />
      ) : (
        <Input
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          className={cn("font-clash font-medium text-base p-4", inputClassName)}
          id={id}
          {...props}
        ></Input>
      )}
    </div>
  );
};
