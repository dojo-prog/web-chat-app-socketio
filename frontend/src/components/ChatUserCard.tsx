const ChatUserCard = () => {
  return (
    <div className="flex items-start px-6 py-4 hover:bg-gray-100 transition-colors duration-150 select-none cursor-pointer">
      <div className="w-12 h-12 bg-blue-100 rounded-full mr-2">
        <img src="" alt="" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold">Name of User</h2>
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
