import { getUser } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  shopId: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const email = session?.data?.user?.email;
      if (email) {
        const response = await getUser(email);
        if (response) {
          setUser(response as User);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [session?.data?.user?.email]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, refetch: fetchUser };
};

export default useUser;
