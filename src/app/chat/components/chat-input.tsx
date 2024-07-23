import React, { FormEvent, useState } from "react";
import useSendMessage from "../../../../hooks/useSendMessage";
import useChatStore from "../../../../store/useStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type FormData = {
  inputValue: { value: string };
};
const ChatInput: React.FC = () => {
  const chatUserName = useChatStore((state) => state.chatUserName);
  const { sendMessage } = useSendMessage();
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = e.currentTarget as unknown as FormData;
    const message = formdata.inputValue.value;
    sendMessage(message);
    e.currentTarget.reset();
  };

  return (
    <>
      {chatUserName && (
        <form
          className="w-full p-4 bg-white shadow-md shadow-gray-800  flex justify-between  py-2 px-1"
          onSubmit={handleSendMessage}
        >
          <Input
            className="w-full p-2 outline-none focus-visible:ring-0"
            type="text"
            placeholder="Type your message..."
            name="inputValue"
            id="inputValue"
          />
          <Button variant={"outline"} type="submit">
            Send
          </Button>
        </form>
      )}
    </>
  );
};

export default ChatInput;
