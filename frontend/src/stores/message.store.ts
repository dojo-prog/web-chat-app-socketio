import { create } from "zustand";
import type { User } from "./auth.store";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { socket } from "../lib/socket";

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string | null;
  image_url: string | null;
  image_path: string | null;
  created_at: string;
}

export interface MessagePayload {
  text: string;
  image: File | undefined;
}

interface MessageState {
  userList: User[];

  fetchingUserList: boolean;
  fetchingInitialMessages: boolean;
  fetchingNextMessages: boolean;
  sendingMessage: boolean;

  selectedUserMessages: Message[];
  messageCursor: Record<string, any> | null;

  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;

  initSocketListeners: () => void;

  fetchAllUsers: () => Promise<void>;
  fetchUserContacts: () => Promise<void>;
  fetchInitialMessagesByUserId: (userId: string) => Promise<void>;
  fetchNextMessagesByUserId: () => Promise<void>;
  sendMessage: (message: MessagePayload) => Promise<void>;
  resetMessageState: () => void;
}

const useMessageStore = create<MessageState>((set, get) => ({
  userList: [],

  fetchingUserList: false,
  fetchingInitialMessages: false,
  fetchingNextMessages: false,
  sendingMessage: false,

  selectedUserMessages: [],
  messageCursor: null,

  selectedUser: null,
  setSelectedUser: (user) => {
    if (user?.id === get().selectedUser?.id) return;

    set({ selectedUserMessages: [], selectedUser: user });

    if (user) {
      get().fetchInitialMessagesByUserId(user.id);
    }
  },

  initSocketListeners: () => {
    socket.off("new_message");

    socket.on("new_message", (message: Message) => {
      const { selectedUser } = get();

      if (
        selectedUser &&
        (message.sender_id === selectedUser.id ||
          message.receiver_id === selectedUser.id)
      ) {
        set((state) => ({
          selectedUserMessages: [...state.selectedUserMessages, message],
        }));
      }
    });
  },

  fetchAllUsers: async () => {
    set({ fetchingUserList: true });
    try {
      const res = await axios.get("/messages/users");
      set({ userList: res.data.users ?? [] });
    } catch (error) {
      console.error("fetchAllUsers error:", error);
    } finally {
      set({ fetchingUserList: false });
    }
  },

  fetchUserContacts: async () => {
    set({ fetchingUserList: true });
    try {
      const res = await axios.get("messages/contacts");
      set({ userList: res.data.contacts ?? [] });
    } catch (error) {
      console.error("fetchUserContacts error:", error);
    } finally {
      set({ fetchingUserList: false });
    }
  },

  fetchInitialMessagesByUserId: async (userId) => {
    if (!userId) {
      throw new Error("Client failed to pass in userId");
    }

    set({ fetchingInitialMessages: true });
    try {
      const res = await axios.get(`/messages/${userId}`);
      set({
        selectedUserMessages: res.data.messages ?? [],
        messageCursor: res.data.nextCursor ?? {},
      });
    } catch (error: any) {
      console.error("fetchInitialMessagesByUserId error:", error);
      toast.error(
        error.response.data.message || "Error fetching messages with user",
      );
    } finally {
      set({ fetchingInitialMessages: false });
    }
  },

  fetchNextMessagesByUserId: async () => {
    const { selectedUser, messageCursor } = get();

    if (!selectedUser?.id) {
      throw new Error("Client failed to pass in userId");
    }

    if (!messageCursor) {
      return;
    }

    set({ fetchingNextMessages: true });
    try {
      const res = await axios.get(`/messages/next/${selectedUser.id}`, {
        params: messageCursor,
      });
      set((state) => ({
        selectedUserMessages: [
          ...res.data.messages,
          ...state.selectedUserMessages,
        ],
        messageCursor: res.data.nextCursor ?? null,
      }));
    } catch (error) {
      console.error("fetchNextMessagesByUserId error:", error);
    } finally {
      set({ fetchingNextMessages: false });
    }
  },

  sendMessage: async (message) => {
    const { selectedUser } = get();

    if (!selectedUser) {
      throw new Error("Client failed to register selectedUser");
    }

    if (!message?.text?.trim() && !message.image) {
      toast.error("Message has no content");
      return;
    }

    set({ sendingMessage: true });
    try {
      const formData = new FormData();

      if (message.text) {
        formData.append("text", message.text);
      }

      if (message.image) {
        formData.append("image", message.image);
      }

      await axios.post(`/messages/${selectedUser.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error: any) {
      console.error("sendMessage error:", error);
      toast.error(
        error.response.data.message ||
          "Something went wrong in sending your message. Please try again",
      );
    } finally {
      set({ sendingMessage: false });
    }
  },

  resetMessageState: () => {
    set({ userList: [], selectedUser: null, messageCursor: null });
  },
}));

export default useMessageStore;
