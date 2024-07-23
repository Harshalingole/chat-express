import React from "react";
import { User } from "@supabase/supabase-js";
import useGetChatUserInfo from "../../../../hooks/useGetChatUserInfo";
import useChatStore from "../../../../store/useStore";

const ChatUser = () => {
  const chatUserName = useChatStore((state) => state.chatUserName)
  return (
    <>
      {chatUserName && (
        <div className="w-full p-4 bg-white/50 shadow-sm flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="ml-4">
            {chatUserName ? (
              <>
                <p className="text-lg font-semibold">{chatUserName}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatUser;
