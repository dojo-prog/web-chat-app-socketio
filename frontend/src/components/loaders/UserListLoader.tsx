const UserListLoader = () => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start px-6 py-4 animate-pulse">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-2" />

          {/* Content */}
          <div className="flex-1">
            {/* Name + Date */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-12 bg-gray-200 rounded" />
            </div>

            {/* Message preview */}
            <div className="h-3 w-full bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListLoader;
