import { useEffect, useState } from "react";
import useChatStore from "../store/useStore";
import { createClient } from "../utils/supabase/client";
type User = {
  id: string,
  username: string,
  online: boolean,
}
const supabase = createClient();
const useGetUserList = () => {
  const [userList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authUserId = useChatStore((state) => state.session?.user.id);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", authUserId)
        .range(0, 9);

      setUsersList(profiles as User[]);
    };
    fetchUsers();

    const channel = supabase
      .channel("realtime profiles")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=neq.${authUserId}`,
        },
        (payload) => {
          console.log('fetchUsers Realtime',payload)
          setUsersList((prev) => [...prev, payload.new as User]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authUserId]);

  return { userList };
};

export default useGetUserList;
