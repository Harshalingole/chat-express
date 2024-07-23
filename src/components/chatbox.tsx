import { useState } from 'react';
import { createClient } from '../../utils/supabase/client'; 

export default function ChatBox({ chatId }) {
  const [message, setMessage] = useState('');
  const supabase = createClient()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === '') return;

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          chat_id: chatId,
          sender_id: supabase.auth.user().id,
          content: message,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
