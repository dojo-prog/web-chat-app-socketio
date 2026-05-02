import { create } from "zustand";
import type { User } from "./auth.store";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string | null;
  image_url: string | null;
  image_path: string | null;
  created_at: string;
}

interface MessageState {
  allUser: User[];
  contacts: User[];

  fetchingUserList: boolean;

  selectedUser: User | null;
  setSelectedUser: (user: User) => void;

  fetchAllUsers: () => Promise<void>;
  fetchUserContacts: () => Promise<void>;
  fetchMessagesByUserId: (userId: string) => Promise<void>;
  fetchNextMessagesByUserId: (userId: string) => Promise<void>;
  sendMessage: (message: Partial<Message>) => Promise<void>;
}

const useMessageStore = create<MessageState>((set) => ({
  allUser: [],
  contacts: [],

  fetchingUserList: false,

  selectedUser: null,
  setSelectedUser: (user) => {},

  fetchAllUsers: async () => {},
  fetchUserContacts: async () => {},
  fetchMessagesByUserId: async () => {},
  fetchNextMessagesByUserId: async () => {},
  sendMessage: async (message) => {},
}));

export default useMessageStore;
