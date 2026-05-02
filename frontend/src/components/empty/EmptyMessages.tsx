import { MessageCircleMore } from "lucide-react";

const EmptyMessages = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <MessageCircleMore className="text-blue-500" size={28} />
        </div>

        <h2 className="text-sm font-semibold text-gray-700">No messages yet</h2>

        <p className="text-xs text-gray-500 max-w-55">
          Start the conversation by sending a message.
        </p>
      </div>
    </div>
  );
};

export default EmptyMessages;
