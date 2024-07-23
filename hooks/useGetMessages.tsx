import { useEffect, useState, useCallback } from 'react';
import { createClient } from '../utils/supabase/client';
import { Message } from '@/app/chat/components/message-list';

const supabase = createClient();

const useGetMessages = (chatId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMessages = useCallback(async (chatId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
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
        console.log(newMessage,"subscribeToMessages")
        if (newMessage.chat_id === chatId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, []);

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
      subscribeToMessages(chatId);
    }
  }, [chatId, fetchMessages, subscribeToMessages]);

  return { messages, error, loading, subscribeToMessages };
};

export default useGetMessages;
