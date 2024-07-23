import React, { useEffect, useState } from "react";
import Link from "next/link";
import useClickChatUser from "../../../../hooks/useClickChatUser";
import useGetUserList from "../../../../hooks/useGetUserList";
import useChatStore from "../../../../store/useStore";

const UserList: React.FC = () => {
  const [clickId, setClikId] = useState<null | string>(null);
  const setChatUserName = useChatStore((state) => state.setChatUserName);
  const curChatUserId = useChatStore((state) => state.curChatUserId)
  const { handleClickUser } = useClickChatUser();
  const { userList } = useGetUserList();
  useEffect(() => {
    if (clickId !== null) {
      handleClickUser(clickId);
      setClikId(null);
    }
  }, [clickId]);

  return (
    <div>
      <div className="flex  justify-between items-center flex-nowrap">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Chat Express</h2>
        <h2 className="mb-4 text-sm font-normal text-gray-500">Chat wit random users</h2>
      </div>

      <ul>
        {userList?.map((user) => (
          <button
            onClick={() => {
              setChatUserName(user?.username);
              setClikId(user?.id);
            }}
            key={user?.id}
            className={`w-full flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 ${
              curChatUserId === user.id ? "bg-green-400" : "bg-green-100"
            }`}
          >
            <Link href={""}>
              <div className="flex items-center">
                <div
                  className={`size-8  rounded-full mr-2  shadow-sm ${curChatUserId === user.id ? 'bg-white/60' : 'bg-white/70' } `}
                  // style={{ backgroundColor: "white" }}
                ></div>
                <span className={`font-medium   drop-shadow-md ${curChatUserId === user.id ? 'text-white' : 'text-gray-700' }`}>
                  {user?.username}
                </span>
              </div>
            </Link>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
