"use client";

import { getShop } from "@/actions/actions";
import { Shop } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useShop = () => {
  const session = useSession();
  const id = session?.data?.user?.shopId;

  const {
    data: shop,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["shop", id],
    queryFn: async () => (await getShop(id as string)) as unknown as Shop,
  });

  return { shop, loading: isLoading, refetch: refetch } as const;
};

export default useShop;
