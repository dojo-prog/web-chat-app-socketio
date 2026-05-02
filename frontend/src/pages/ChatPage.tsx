import { useEffect, useState } from "react";
import ChatUserCard from "../components/ChatUserCard";
import useMessageStore from "../stores/message.store";
import UserListLoader from "../components/loaders/UserListLoader";
import EmptyUserList from "../components/empty/EmptyUserList";
import NoConverstationSelected from "../components/empty/NoConverstationSelected";
import Conversation from "../components/Conversation";
import { SearchIcon } from "lucide-react";

const tabs = [
  { key: "all", title: "All users" },
  { key: "contacts", title: "Contacts" },
];

const ChatPage = () => {
  const {
    fetchAllUsers,
    fetchUserContacts,
    fetchingUserList,
    userList,
    selectedUser,
  } = useMessageStore();

  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    if (selectedTab === "all") fetchAllUsers();
    if (selectedTab === "contacts") fetchUserContacts();
  }, [selectedTab]);

  return (
    <div className="h-[calc(100vh-9.5rem)] w-full flex space-x-4">
      {/* Chat List */}
      <div className="w-1/3 h-full bg-white rounded-lg flex flex-col">
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
        <div className="flex-1 w-full overflow-y-auto">
          {fetchingUserList ? (
            <UserListLoader />
          ) : userList.length === 0 ? (
            <EmptyUserList />
          ) : (
            userList.map((u) => <ChatUserCard key={u.id} user={u} />)
          )}
        </div>
      </div>

      {/* Chat Containter */}
      <div className="w-2/3 h-full bg-white rounded-lg overflow-hidden">
        {!selectedUser ? <NoConverstationSelected /> : <Conversation />}
      </div>
    </div>
  );
};

export default ChatPage;
