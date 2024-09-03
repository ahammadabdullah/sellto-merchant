import { Button } from "@/components/ui/button";
import { cn, isValidEmail } from "@/lib/utils";
import { useState } from "react";
import { toast, useToast } from "../hooks/use-toast";
import { Toast } from "../ui/toast";

// loading icon
import { Loader2 } from "lucide-react";

export interface classProps {
  className?: string;
  t: any;
}

export default function Component({ className, t }: classProps) {
  const { toast } = useToast();
  // button loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    if (isValidEmail(email as string)) {
      fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          console.log(res.status);
          let resData = await res.json();
          // console.log(resData);
          if (res.status !== 200) {
            toast({
              variant: "destructive",
              title: "Error",
              description: resData.message,
            });
          } else if (resData.error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: resData.message,
            });
          } else {
            toast({
              title: "Success",
              description: resData.message,
            });
          }

          setIsLoading(false);
          return resData;
        })
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "Something went wrong, contact support if this continues",
          });
        });
    } else {
      toast({
        title: "Error",
        description: "Please provide a valid email",
      });
    }
    // clear the email input here
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    if (emailInput) {
      emailInput.value = "";
    }
  };
  return (
    <form
      onSubmit={handleSubmission}
      className={cn(
        "flex flex-wrap items-center border border-primary bg-primary/25 p-2 rounded-md has-[:focus]:bg-primary/15 has-[:focus]:outline-primary outline outline-1 outline-transparent duration-200",
        className
      )}
    >
      <input
        name="email"
        type={"email"}
        placeholder={t("input.input")}
        min="4"
        className="sm:min-w-[250px] min-w-[170px] flex-1 flex-grow px-4 py-2 rounded-l-md bg-primary/0  h-10 w-full rounded-md  text-sm  placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button
        type="submit"
        variant={"secondary"}
        className="flex-grow sm:flex-grow-0"
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-20 animate-spin" />
        ) : (
          t("input.button")
        )}
      </Button>
    </form>
  );
}
