import React, { useEffect, useState } from "react";
import Link from "next/link";
import useClickChatUser from "../../../../hooks/useClickChatUser";
import useGetUserList from "../../../../hooks/useGetUserList";
import useChatStore from "../../../../store/useStore";
import useIsMobile from "../../../../hooks/useIsMobile";
import { cn } from "@/lib/utils";

const UserList: React.FC = () => {
  const [clickId, setClikId] = useState<null | string>(null);
  const setChatUserName = useChatStore((state) => state.setChatUserName);
  const chatUserName = useChatStore((state) => state.chatUserName);
  const curChatUserId = useChatStore((state) => state.curChatUserId);
  const userName = useChatStore((state) => state.session?.user.email);
  const { handleClickUser } = useClickChatUser();
  const { userList } = useGetUserList();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (clickId !== null) {
      handleClickUser(clickId);
      setClikId(null);
    }
  }, [clickId]);

  return (
    <div
      className={cn(
        `bg-white rounded-lg col-span-2  shadow-xl p-4 border-r overflow-y-auto`,
        isMobile && chatUserName ? "hidden" : "block"
      )}
    >
      <div className="flex flex-row justify-between mb-4 items-center flex-nowrap">
        <div className="flex flex-col justify-between  items-start flex-nowrap">
          <h2 className="text-xl font-semibold text-gray-700">Chat Express</h2>
          <h2 className="text-sm font-normal text-gray-500">
            Chat with random users
          </h2>
        </div>
        <div className=" self-start">
          <p className="text-xl font-normal text-gray-600 font-mono">Hi, {userName?.split("@")[0]}</p>
        </div>
      </div>

      <ul>
        {userList?.map((user) => (
          <button
            onClick={() => {
              setChatUserName(user?.username);
              setClikId(user?.id);
            }}
            key={user?.id}
            className={`w-full flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer hover:bg-[#f8dce0] ${
              curChatUserId === user.id ? "bg-blue-400" : "bg-blue-50"
            }`}
          >
            <Link href={""}>
              <div className="flex items-center">
                <div
                  className={`size-8  rounded-full mr-2  shadow-sm ${
                    curChatUserId === user.id ? "bg-white/60" : "bg-white/70"
                  } `}
                ></div>
                <span
                  className={`font-medium   drop-shadow-md hover:text-slate-950 ${
                    curChatUserId === user.id ? "text-white" : "text-gray-700 "
                  }`}
                >
                  {user?.username}
                </span>
              </div>
            </Link>
          </button>
        ))}
      </ul>

      <div className="container">
        <div className="userInfo"></div>
        <div className="messagelist"></div>
        <div className="inputbox"></div>
      </div>
    </div>
  );
};

export default UserList;
