import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast, useToast } from "../hooks/use-toast";
import { Toast } from "../ui/toast";

export interface classProps {
  className?: string;
  t: any;
}
export default function Component({ className, t }: classProps) {
  const { toast } = useToast();

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    console.log(email);
    if (email) {
      toast({
        title: "Success",
        description: "You have been added to the waitlist",
      });

      console.log("object");
    } else {
      toast({
        title: "please provide a valid email",
        variant: "destructive",
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
      >
        {t("input.button")}
      </Button>
    </form>
  );
}
