"use client";
import ChatBox from "./components/chat-box";
import { FC } from "react";
import useAuth from "../../../hooks/useAuth";
import UserList from "./components/user-list";

const ChatPage: FC = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="grid md:grid-cols-5 max-h-max  h-full">
      <UserList  />
      <ChatBox />
    </div>
  );
};

export default ChatPage;
