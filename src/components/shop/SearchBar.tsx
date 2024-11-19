"use client"; // This will make this component a Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input as IconInput } from "@/components/ui/inputWithIcon";
import { Search } from "lucide-react";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      router.push(`?query=${query}`);
    } else {
      router.push("/products");
    }
  }, [query, router]);

  return (
    <IconInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search a product.."
      startIcon={Search}
      className="py-6"
    />
  );
}
