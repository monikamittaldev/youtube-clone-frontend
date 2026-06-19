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
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl border border-theme rounded-3xl bg-primary p-8 md:p-12">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <SiYoutube className="text-red-600 text-4xl" />
          <span className="text-2xl font-medium text-primary">
            YouTube
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-normal text-primary mb-2">
          Create your account
        </h1>

        <p className="text-secondary mb-10">
          Join YouTube and create your channel
        </p>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-10">
          <label className="relative cursor-pointer group">

            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-theme flex items-center justify-center bg-hover">

              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-secondary text-sm">
                  Upload
                </span>
              )}
            </div>

            <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full">
              <FaCamera className="text-sm" />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>

          <p className="text-sm text-secondary mt-3">
            Upload profile photo
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Channel name"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-theme rounded-xl bg-transparent px-4 py-3 text-primary outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-theme rounded-xl bg-transparent px-4 py-3 text-primary outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-theme rounded-xl bg-transparent px-4 py-3 text-primary outline-none focus:ring-1 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-full font-medium mt-2"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <span className="text-secondary">
            Already have an account?
          </span>

          <button className="ml-2 text-blue-500 hover:underline font-medium">
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;