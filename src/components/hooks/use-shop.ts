import { getShop, getUser } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

interface Shop {
  id: string;
  name: string;
  image?: string;
  favicon?: string;
  subTitle?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  theme?: any;
  currency: string;
  productTypes?: string;
  subDomain: string;
  categories: any[];
  orders: any[];
  products: any[];
  user: any;
}

const useShop = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const fetchShop = useCallback(async () => {
    setLoading(true);
    try {
      const id = session?.data?.user?.shopId;
      if (id) {
        const response = await getShop(id);
        if (response) {
          setShop(response as unknown as Shop);
        } else {
          setShop(null);
        }
      }
    } catch (error) {
      setShop(null);
    } finally {
      setLoading(false);
    }
  }, [session?.data?.user?.shopId]);
  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  return { shop, loading, refetch: fetchShop };
};

export default useShop;
