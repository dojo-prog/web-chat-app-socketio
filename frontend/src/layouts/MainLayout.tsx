import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen flex justify-center bg-[#EFEFEF] p-8">
      <div className="max-w-5xl w-full">
        <NavBar />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
