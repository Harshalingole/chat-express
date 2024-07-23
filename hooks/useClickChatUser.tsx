import useChatStore from "../store/useStore";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

const useClickChatUser = () => {
  const { session, setCurChatUserId, setCurChatId } = useChatStore();

  const handleClickUser = async (id: string) => {
    setCurChatUserId(id);

    // Check if there's an existing chat between the current user and the clicked user
    const authUserId = session?.user.id
    const { data:chats, error } = await supabase
      .from("chats")
      .select("id")
      .or(
        `and(user1_id.eq.${authUserId},user2_id.eq.${id}),and(user1_id.eq.${id},user2_id.eq.${authUserId})`
      );
      
    if (error || !chats) {
      // No chat found or error occurred
      setCurChatId(null);
      console.error("No chat found or error occurred:", error);
    } else {
      // Chat found
      setCurChatId(chats[0]?.id || null)
    }
  };

  return { handleClickUser };
};

export default useClickChatUser;
