import { useState } from "react";
import { SiYoutube } from "react-icons/si";
import { FaCamera } from "react-icons/fa";

const Register = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#f0f4f9] dark:bg-[#1e1e1f]">
      <div className="w-full max-w-6xl bg-white dark:bg-[#282828] rounded-[28px] px-8 py-10 shadow-sm">

        <div className="flex flex-col md:flex-row gap-12">

          {/* LEFT SECTION */}
          <div className="md:w-2/5">

            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <SiYoutube className="text-red-600 text-4xl" />
              <span className="text-2xl font-medium text-[#202124] dark:text-white">
                YouTube
              </span>
            </div>

            <h1 className="text-[34px] leading-tight font-normal text-[#202124] dark:text-white mb-4">
              Create your account
            </h1>

            <p className="text-[#5f6368] dark:text-gray-400 text-base">
              Join YouTube and create your channel
            </p>

          </div>

          {/* RIGHT SECTION */}
          <div className="md:w-3/5">

            {/* Avatar Upload */}
            <div className="flex justify-center mb-8">
              <label className="relative cursor-pointer">

                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#3a3a3a] flex items-center justify-center">

                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      Upload
                    </span>
                  )}
                </div>

                <div className="absolute bottom-0 right-0 bg-[#1a73e8] text-white p-2 rounded-full">
                  <FaCamera className="text-xs" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="username"
                placeholder="Channel name"
                value={formData.username}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-[#282828]
                  text-[#202124]
                  dark:text-white
                  outline-none
                  focus:border-[#1a73e8]
                "
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-[#282828]
                  text-[#202124]
                  dark:text-white
                  outline-none
                  focus:border-[#1a73e8]
                "
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-[#282828]
                  text-[#202124]
                  dark:text-white
                  outline-none
                  focus:border-[#1a73e8]
                "
                required
              />

              <button
                type="submit"
                className="
                  w-full
                  h-11
                  bg-[#1a73e8]
                  hover:bg-[#1765cc]
                  text-white
                  rounded-full
                  font-medium
                  transition-colors
                  mt-2
                "
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-[#5f6368] dark:text-gray-400">
                Already have an account?
              </span>

              <button
                type="button"
                className="ml-2 text-[#1a73e8] font-medium hover:underline"
              >
                Sign In
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;