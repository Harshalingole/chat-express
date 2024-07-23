import { Message } from "@/app/chat/components/message-list";
import { createClient } from "./client";

const supabase = createClient()
export const broadcastMessage = async (message:Message) => {
  const channel = supabase.channel('broadcast')
  // const { data, error } = await supabase
  //   .from('broadcast')
  //   .insert({
  //     event: 'new_message',
  //     payload: message,
  //   });
  const res = await channel.send({
    type: 'broadcast',
    event: 'new_message',
    payload: message
  })

  // if (res) {
  //   console.error('broadcasting message:', res);
  // }
};
