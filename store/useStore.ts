// store/useChatStore.ts
import { Session, User } from '@supabase/supabase-js';
import create from 'zustand';

interface ChatState {
  session: Session | null;
  authUserId: string | null;
  authChatIds: number[];
  curChatUserId: string | null;
  curChatId: number | null;
  msgContent: string;
  clickMsgSend: boolean,
  chatUserName: string | null,
  user: User | null,
  setSession: (session: Session) => void;
  setAuthChatIds: (chatIds: number[]) => void;
  setCurChatUserId: (userId: string) => void;
  setCurChatId: (chatId: number | null) => void;
  setMsgContent: (msgContent: string) => void;
  setButtonClikMsgSend: (click: boolean) => void;
  setChatUserName: (name: string | null) => void;
  setUser: (user: User | null) => void
}
const useChatStore = create<ChatState>((set) => ({
  session: null,
  authUserId: null,
  authChatIds: [],
  curChatUserId: null,
  curChatId: null,
  msgContent: '',
  clickMsgSend: false,
  chatUserName: null,
  user: null,
  setSession: (session) => set({ session }),
  setAuthChatIds: (chatIds) => set({ authChatIds: chatIds }),
  setCurChatUserId: (userId) => set({ curChatUserId: userId }),
  setCurChatId: (chatId) => set({ curChatId: chatId }),
  setMsgContent: (msgContent) => set({ msgContent }),
  setButtonClikMsgSend: (click) => set({clickMsgSend: click}),
  setChatUserName: (name) => set({chatUserName: name}),
  setUser: (user) => set({user: user})

}));

export default useChatStore
