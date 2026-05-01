import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80%] max-w-4xl w-full border border-gray-200 rounded-lg shadow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
