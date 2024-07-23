import React, { useEffect, useRef } from "react";
import useGetMessages from "../../../../hooks/useGetMessages";
import useStore from "../../../../store/useStore";
export type Message = {
  sender_id: string;
  chat_id: number;
  id?: number;
  content: string;
  sent_at: string;
  expires_at: string;
};

const MessageList: React.FC = () => {
  const chatId = useStore((state) => state.curChatId);
  const currentUserId = useStore((state) => state.session?.user.id);
  const { messages, error, loading, subscribeToMessages } =
    useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      subscribeToMessages(chatId);
    }
  }, [chatId, subscribeToMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto h-[80%] md:h-[82%] no-scrollbar">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender_id === currentUserId
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs py-1  px-4 rounded-lg shadow-lg ${
              message.sender_id === currentUserId
                ? "bg-blue-500  text-white text-right"
                : "bg-gray-200 text-gray-800 text-left"
            }`}
          >
            {message.content}
            {/* <span className="block text-xs text-grey-800 mt-1">
              {new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span> */}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
