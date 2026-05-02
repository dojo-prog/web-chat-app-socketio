import type { User } from "../stores/auth.store";

interface ChatUserCardProps {
  user: User;
}

const ChatUserCard = ({ user: u }: ChatUserCardProps) => {
  return (
    <div className="flex items-start px-6 py-4 hover:bg-gray-100 transition-colors duration-150 select-none cursor-pointer">
      <div className="w-12 h-12 bg-blue-100 rounded-full mr-2 overflow-hidden flex items-center justify-center">
        {u.avatar_url ? (
          <img
            src={u.avatar_url}
            alt={u.fname}
            className="h-full w-full object-cover"
          />
        ) : (
          <h2 className="font-bold text-blue-700">
            {u?.fname[0] + u?.lname[0]!}
          </h2>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold">{u.fname + " " + u.lname}</h2>
          <p className="text-xs text-gray-500">12/21/26</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 line-clamp-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            beatae ex impedit, maiores ratione debitis doloribus nam excepturi
            quos reiciendis consectetur iusto quam quo tempora, molestiae at
            dolorem illum placeat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
