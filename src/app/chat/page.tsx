"use client";
import { Button } from "@/components/ui/button";
import ChatList from "./components/chat-list";
import ChatBox from "./components/chat-box";
import { dummyUsers } from "./components/data";
import UserList from "./components/user-list";
import OnlineAvailableUserList from "./components/chat-list";
import { withAuth } from "next-auth/middleware";
import { FC } from "react";
import useAuth from "../../../hooks/useAuth";
import useStore from "../../../store/useStore";

const ChatPage:FC = () => {
  const { isLoading } = useAuth();
  const session = useStore((state) => state.session); 
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to the login page after successful sign-out
        window.location.href = "/login";
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-5 h-[100%] m-1">
      
      <OnlineAvailableUserList />

      {/* Chat Msg box */}
      <ChatBox />
      
    </div>
  );
};

export default ChatPage
