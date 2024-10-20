// import Image from "next/image";
// import Link from "next/link";

import { cn } from "@/lib/utils";

export default function PageTitle({
  className,
  Icon,
  title,
  subTitle,
}: {
  className?: string;
  Icon: any;
  title: string;
  subTitle?: string;
}) {
  return (
    <div
      className={cn("w-full flex place-items-center  gap-2 mb-8", className)}
    >
      <Icon className="text-primary2 min-w-[30px] mb-[-2.5px]" size={30}></Icon>
      <div className="flex flex-wrap place-items-end ">
        <h1 className="text-3xl sm:text-4xl font-clash  mr-2 mb-[-5px]">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground ">{subTitle}</p>
      </div>
    </div>
  );
}
