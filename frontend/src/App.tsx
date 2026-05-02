import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ChatPage from "./pages/ChatPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Slide, ToastContainer } from "react-toastify";
import useAuthStore from "./stores/auth.store";

const App = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to={"/auth"} />}
        >
          <Route index element={<ChatPage />} />
        </Route>

        <Route
          path="/auth"
          element={!user ? <AuthLayout /> : <Navigate to={"/"} />}
        >
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer theme="colored" transition={Slide} autoClose={2000} />
    </>
  );
};

export default App;
