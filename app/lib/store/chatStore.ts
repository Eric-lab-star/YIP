import { create } from "zustand";
import { getChatRoomsAction } from "@/app/actions/chatAction";

export type SerializedRoom = {
  _id: string;
  name: string;
  type: "public" | "ai" | "private";
  inviteCode: string;
  createdBy: string;
  members: string[];
  createdAt: string;
};

interface ChatStore {
  rooms: SerializedRoom[];
  selectedRoom: SerializedRoom | null;
  setSelectedRoom: (room: SerializedRoom | null) => void;
  loadRooms: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  rooms: [],
  selectedRoom: null,
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  loadRooms: async () => {
    const res = await getChatRoomsAction();
    if (res.success) set({ rooms: res.rooms });
  },
}));
