import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "../hooks/useForm";
import useAuthStore, { type SignupInputs } from "../stores/auth.store";

const SignupPage = () => {
  const { signup, loading } = useAuthStore();

  const { formData, handleChange } = useForm({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signup(formData as SignupInputs);
  };

  return (
    <div className="h-full w-full flex">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-500"></div>

      {/* Right Section */}
      <div className="w-1/2 px-10 flex flex-col items-center justify-center">
        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <p className="text-gray-400 text-sm">
            <span className="text-blue-500 font-bold">Get started</span> with an
            account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <CustomInput
              label="First Name"
              placeholder="John"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
            />
            <CustomInput
              label="Last Name"
              placeholder="Doe"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>

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

          <CustomInput
            label="Confirmation password"
            placeholder="Enter same password"
            type="password"
            id="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
          />

          <CustomButton type="submit" title="Sign Up" loading={loading} />
        </form>

        <div className="mt-4">
          <p className="text-xs text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
