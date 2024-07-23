"use client";

import MessageList from "./message-list";
import ChatInput from "./chat-input";
import ChatUser from "./chat-user";
const ChatBox = () => {

  return (
    <section className="h-full bg-white/40 rounded-md col-start-3 col-end-10 flex flex-col justify-between w-full overflow-hidden">
      <ChatUser />
      {/*  */}
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>
      {/*  */}
      <ChatInput />
    
    </section>
  );
};

export default ChatBox;
