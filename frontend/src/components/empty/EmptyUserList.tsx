import { Users } from "lucide-react";

const EmptyUserList = () => {
  return (
    <div className="h-full w-full flex justify-center px-6 pt-16">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="text-blue-500" size={28} />
        </div>

        <h2 className="text-sm font-semibold text-gray-700">No users found</h2>

        <p className="text-xs text-gray-500 max-w-60">
          There are no users to display right now. Try switching tabs or check
          back later.
        </p>
      </div>
    </div>
  );
};

export default EmptyUserList;
