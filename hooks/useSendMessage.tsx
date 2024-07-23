import { fetchChatId } from "@/app/chat/utils/util";
import useChatStore from "../store/useStore";
import { createClient } from "../utils/supabase/client";
import { broadcastMessage } from "../utils/supabase/brodcast";
import { Message } from "@/app/chat/components/message-list";

const supabase = createClient();

const useSendMessage = () => {
  const { session, curChatUserId, curChatId, setCurChatId } = useChatStore();

  const sendMessage = async (msgContent: string) => {
    if (msgContent.trim().length === 0) return;
    const authUserId = session?.user.id;
    if (!authUserId || !curChatUserId) return;

    let chatId = curChatId;
    if (chatId === null) {
      // Create new chat
      const { data: newChat, error: chatError } = await supabase
        .from("chats")
        .insert([{ user1_id: authUserId, user2_id: curChatUserId }]);

      if (chatError) {
        console.error("Error creating chat:", chatError);
        return;
      }

      chatId = await fetchChatId(authUserId, curChatUserId);
      setCurChatId(chatId);
    }
    // Send message
    const newMessage:Message = {
      chat_id: chatId as number,
      sender_id: authUserId,
      content: msgContent,
      sent_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };

    broadcastMessage(newMessage)

    // Send message
    const { data: newMessageData, error: messageError } = await supabase
      .from("messages")
      .insert([
        {
          chat_id: chatId,
          sender_id: authUserId,
          content: msgContent,
          sent_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        },
      ])
      .single();

    if (messageError) {
      console.error("Error sending message:", messageError);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
