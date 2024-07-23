"use client";

import MessageList from "./message-list";
import ChatInput from "./chat-input";
import ChatUser from "./chat-user";
import useIsMobile from "../../../../hooks/useIsMobile";
import { cn } from "@/lib/utils";
import useChatStore from "../../../../store/useStore";
const ChatBox = () => {
  const isMobile = useIsMobile();
  const chatUserName = useChatStore((state) => state.chatUserName);
  return (
    <section
      className={cn(
        "chatbox h-full bg-white/50 rounded-md col-start-3 col-end-10  w-full overflow-hidden  flex flex-col justify-between",
        isMobile && !chatUserName ? "hidden" : "block"
      )}
    >
        <ChatUser />{/*  */}

      {/*  */}

      <MessageList />

      {/*  */}
      <ChatInput />
    </section>
  );
};

export default ChatBox;
