import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "../hooks/useForm";
import useAuthStore, { type SigninInputs } from "../stores/auth.store";
import authImage from "../assets/images/auth-image.png";

const LoginPage = () => {
  const { login, loading } = useAuthStore();

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(formData as SigninInputs);
  };

  return (
    <div className="h-full w-full flex">
      {/* Left Section */}
      <div className="w-1/2 bg-linear-to-br from-blue-500 to-blue-900 flex flex-col justify-center items-center px-12 text-white">
        {/* Image */}
        <img
          src={authImage}
          alt="auth_visual"
          className="w-[80%] max-w-md mb-8 drop-shadow-xl"
        />

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Stay Connected, Anytime
          </h1>

          <p className="text-blue-100 text-sm max-w-md">
            Chat seamlessly with your friends and colleagues. Share messages,
            images, and moments — all in real time.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 px-10 flex flex-col items-center justify-center">
        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Sign In</h2>
          <p className="text-gray-400 text-sm">
            <span className="text-blue-500 font-bold">Welcome back!</span> Login
            to chat with friends!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Email"
            placeholder="john@example.com"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />

          <CustomButton type="submit" title="Login" loading={loading} />
        </form>

        <div className="mt-4">
          <p className="text-xs text-gray-400 mt-2">
            Don't have an account?{" "}
            <Link
              to={"/auth/signup"}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
