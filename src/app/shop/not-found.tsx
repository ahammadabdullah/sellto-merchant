import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
export default function NotFound() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center motion-blur-in-[50px]">
      <h1 className="motion-preset-seesaw text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">
        The Store you&apos;re looking for is not available
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <p className="mt-2">Sorry, we couldn&apos;t find</p>
        <code className="mt-2 rounded-md border bg-muted/50 p-2 text-sm">
          &quot;{subdomain}&quot;
        </code>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* {hasPreviousPath && (
          <Button className="mt-10" asChild>
            <Link href="/">
              <ArrowLeft />
              Go back
            </Link>
          </Button>
        )} */}
        <Button className="group mt-10" asChild>
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}`} replace>
            <ArrowLeft
              className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
