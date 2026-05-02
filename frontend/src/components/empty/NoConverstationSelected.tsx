import { MessageCircleMore } from "lucide-react";

const NoConverstationSelected = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <MessageCircleMore size={100} className="text-blue-500" />
        <h2 className="text-xl font-semibold">No conversation selected</h2>
        <p className="text-sm text-gray-500">
          You can view and choose your converation in the sidebar
        </p>
      </div>
    </div>
  );
};

export default NoConverstationSelected;
