import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useChatStore from "../store/useStore";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

const useGetChatUserInfo = () => {
  const [chatUser, setChatUser] = useState<User | null>(null);
  const curChatUserId = useChatStore((state) => state.curChatUserId);

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', curChatUserId)
        .single();

      if (error) {
        throw error;
      }

      // console.log("useGetChatUserInfo", data);
      setChatUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setChatUser(null);
    }
  };

  useEffect(() => {
    if (curChatUserId) {
      fetchUser();
    }
  }, [curChatUserId]);

  return chatUser;
};

export default useGetChatUserInfo;
