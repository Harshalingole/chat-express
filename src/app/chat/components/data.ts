import { Message } from "./message-list";


export interface User {
  id: string;
  username: string;
  online: boolean;
}


export const dummyMessages: Message[] = [
  {
    id: 1,
    chat_id: 1,
    sender_id: 'user1',
    content: 'Hello! How are you?',
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    chat_id: 1,
    sender_id: 'user2',
    content: 'I am good, thank you! How about you?',
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    chat_id: 1,
    sender_id: 'user1',
    content: 'I am doing great, just working on some projects.',
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    chat_id: 1,
    sender_id: 'user2',
    content: 'That sounds interesting! What projects are you working on?',
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    chat_id: 1,
    sender_id: 'user1',
    content: 'I am building a chat application with Next.js and Supabase.',
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
];


export const dummyUsers: User[] = [
  {
    id: 'user1',
    username: 'Alice',
    online: true,
  },
  {
    id: 'user2',
    username: 'Bob',
    online: false,
  },
  {
    id: 'user3',
    username: 'Charlie',
    online: true,
  },
];
