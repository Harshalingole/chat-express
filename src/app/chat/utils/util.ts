import { createClient } from "../../../../utils/supabase/client";

export const fetchChatId = async (authUserId: string, chatUserId: string) => {
  const supabase = createClient();

  const { data: chats, error } = await supabase
    .from("chats")
    .select("id")
    .or(
      `and(user1_id.eq.${authUserId},user2_id.eq.${chatUserId}),and(user1_id.eq.${chatUserId},user2_id.eq.${authUserId})`
    );
  if (error || !chats) {
    console.error("No chat found or error occurred:", error);
    return null
  } else {
    return chats[0].id;
  }
};
