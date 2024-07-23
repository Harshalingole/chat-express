import { useEffect, useState, useCallback } from 'react';
import { createClient } from '../utils/supabase/client';
import { Message } from '@/app/chat/components/message-list';
import useChatStore from '../store/useStore';

const supabase = createClient();

const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const curChatId = useChatStore((state) => state.curChatId)
  const fetchMessages = useCallback(async (chatIdFetch: number) => {
    if(chatIdFetch === null) return
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatIdFetch)
      .order('sent_at', { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setMessages(data);
    }
    setLoading(false);
  }, []);

  const subscribeToMessages = useCallback((chatId: number) => {
    const messageSubscription = supabase
      .channel('broadcast')
      .on('broadcast',{event:"new_message"}, (payload) => {
        const newMessage = payload.payload;
        if (newMessage.chat_id === curChatId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [curChatId]);

  useEffect(() => {
      fetchMessages(Number(curChatId));
      subscribeToMessages(Number(curChatId));
  }, [curChatId, fetchMessages, subscribeToMessages]);

  return { messages, error, loading, subscribeToMessages };
};

export default useGetMessages;
