import React from "react";
import useChatStore from "../../../../store/useStore";
import { ArrowLeft } from "lucide-react";
import useIsMobile from "../../../../hooks/useIsMobile";
import { cn } from "@/lib/utils";

const ChatUser = () => {
  const chatUserName = useChatStore((state) => state.chatUserName);
  const setChatUserName = useChatStore((state) => state.setChatUserName);
  const isMobile = useIsMobile();
  return (
    <>
      {chatUserName && (
        <div
          className={cn(
            "userInfo w-full  p-4 gap-4 bg-white shadow-sm flex items-center justify-between"
          )}
        >
          {isMobile && <ArrowLeft className="mt-6 md:m-0"  onClick={() => setChatUserName(null)} />}
          <div className="flex items-center align-middle mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="ml-4">
              <p className="text-lg font-semibold">{chatUserName}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatUser;
