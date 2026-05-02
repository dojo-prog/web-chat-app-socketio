import { MessageCircleMore, SearchIcon } from "lucide-react";
import { useState } from "react";
import ChatUserCard from "../components/ChatUserCard";

const tabs = [
  { key: "all", title: "All users" },
  { key: "contacts", title: "Contacts" },
];

const ChatPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div className="h-[calc(100vh-9.5rem)] w-full flex space-x-4">
      {/* Chat List */}
      <div className="w-1/3 h-full bg-white rounded-lg">
        <div className="px-6 py-4 flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Users List</h2>
          <button className="cursor-pointer">
            <SearchIcon size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 flex items-center justify-center space-x-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setSelectedTab(t.key)}
              className={`w-full ${selectedTab === t.key ? "text-blue-500 border-b-2 border-blue-500 font-semibold" : "text-gray-600"} cursor-pointer`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* User List */}
        <div className="w-full">
          <ChatUserCard />
          <ChatUserCard />
        </div>
      </div>

      {/* Chat Containter */}
      <div className="w-2/3 h-full bg-white rounded-lg">
        {/* No Convo Selected UI */}
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <MessageCircleMore size={100} className="text-blue-500" />
            <h2 className="text-xl font-semibold">No conversation selected</h2>
            <p className="text-sm text-gray-500">
              You can view and choose your converation in the sidebar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
