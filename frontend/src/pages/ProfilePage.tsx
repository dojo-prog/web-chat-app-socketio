import { PenIcon, UserIcon } from "lucide-react";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "../hooks/useForm";
import useAuthStore, { type UserWithImage } from "../stores/auth.store";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, updateUserProfile, loading } = useAuthStore();

  const { formData, setFormData, handleChange, handleFileChange } = useForm({
    fname: "",
    lname: "",
    email: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!user) return;
    const { fname, lname, email } = user;
    setFormData({
      fname,
      lname,
      email,
    });
  }, []);

  const handleSubmit = () => {
    if (!user) return;

    updateUserProfile(user, formData as UserWithImage);
  };

  return (
    <div className="h-[calc(100vh-9.5rem)] w-full flex justify-center">
      <div className="h-full max-w-xl w-full bg-white rounded-lg p-12 flex flex-col">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-4xl font-bold">Edit profile</h2>
          <div className="relative w-30 h-30 rounded-full bg-blue-100 flex items-center justify-center">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.fname}
                className="h-full w-full rounded-full object-cover"
              />
            ) : imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="h-16 w-16 text-blue-500" />
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image"
              name="image"
              onChange={(e) => {
                handleFileChange(e);
                const file = e.target.files?.[0];
                if (!file) return;
                setImagePreview(URL.createObjectURL(file));
              }}
            />

            <label
              htmlFor="image"
              className="absolute bottom-1 left-3 h-6 w-6 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center p-1 cursor-pointer"
            >
              <PenIcon className="h-full text-blue-500" />
            </label>
          </div>
        </div>

        {/* User Fields */}
        <div className="h-full flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <CustomInput
                label="First Name"
                id="fname"
                value={formData.fname}
                onChange={handleChange}
              />
              <CustomInput
                label="Last Name"
                id="lname"
                value={formData.lname}
                onChange={handleChange}
              />
            </div>

            <CustomInput
              label="Email (cannot modify)"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
            />
          </div>

          <div className="flex items-center spacex-4">
            <CustomButton
              type="button"
              title="Save"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
