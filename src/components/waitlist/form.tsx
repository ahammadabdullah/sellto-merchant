import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface classProps {
  className?: string;
  t: any;
}
export default function Component({ className, t }: classProps) {
  return (
    <form
      className={cn(
        "flex flex-wrap items-center border border-primary bg-primary/25 p-2 rounded-md has-[:focus]:bg-primary/15 has-[:focus]:outline-primary outline outline-1 outline-transparent duration-200",
        className
      )}
    >
      <input
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
