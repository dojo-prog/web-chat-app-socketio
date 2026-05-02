const MessagesLoader = () => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => {
        const isSender = i % 2 === 0;

        return (
          <div
            key={i}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-lg ${
                isSender ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {/* Fake text lines */}
              <div
                className={`h-3 w-32 ${
                  isSender ? "bg-blue-300" : "bg-gray-300"
                } rounded mb-2`}
              />
              <div
                className={`h-3 w-25 ${
                  isSender ? "bg-blue-300 " : "bg-gray-300"
                } rounded mb-1`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesLoader;
