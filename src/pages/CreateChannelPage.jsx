import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiYoutube } from "react-icons/si";
import { FaCamera } from "react-icons/fa";
import usePost from "../hooks/usePost";
import { useToast } from "../components/ToastContainer";

const CreateChannelPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });
  const [channelAvatarFile, setChannelAvatarFile] = useState(null); // ← new
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const token = localStorage.getItem("yt_token");
  const { postData, loading } = usePost("http://localhost:5000/api/channel");

  // ── Redirect if not logged in ─────────────
  if (!token) {
    navigate("/auth");
    return null;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setChannelAvatarFile(file); // ← store the File
    setAvatarPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const errs = {};
    if (!formData.channelName.trim())
      errs.channelName = "Channel name is required";
    else if (formData.channelName.length < 3)
      errs.channelName = "Channel name must be at least 3 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      // Merge file into payload — usePost will auto-detect and send FormData
      const payload = { ...formData };
      if (channelAvatarFile) payload.channelAvatar = channelAvatarFile;

      const res = await postData(payload, token);
      if (res.success) {
        const user = JSON.parse(localStorage.getItem("yt_user") || "null");
        if (user) {
          user.channel = res.channel._id;
          localStorage.setItem("yt_user", JSON.stringify(user));
        }
        showToast("Channel created successfully!", "success");
        navigate(`/channel/${res.channel._id}`);
      }
    } catch (err) {
      showToast(err.message || "Failed to create channel", "error");
    }
  };

  const inputClass = (field) => `
    w-full h-12 px-4 rounded-xl border
    ${errors[field] ? "border-red-500" : "border-[#3f3f3f]"}
    bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors text-sm
  `;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-[#282828] rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <SiYoutube className="text-red-600 text-3xl" />
          <span className="text-gray-900 dark:text-white text-xl font-medium">
            YouTube
          </span>
        </div>

        <h1 className="text-gray-900 dark:text-white text-2xl font-normal mb-1">
          How you'll appear
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Set up your channel to start uploading
        </p>

        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-[#3f3f3f] bg-gray-100 dark:bg-[#3f3f3f] flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-xs text-center px-2">
                  Upload photo
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full group-hover:bg-blue-500 transition-colors">
              <FaCamera className="text-white text-xs" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarPreview}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="channelName"
              placeholder="Channel name"
              value={formData.channelName}
              onChange={handleChange}
              className={inputClass("channelName")}
            />
            {errors.channelName && (
              <p className="text-red-500 text-xs mt-1">{errors.channelName}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#3f3f3f] bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors text-sm resize-none"
            />
          </div>

          <div>
            <input
              type="url"
              name="channelBanner"
              placeholder="Banner image URL (optional)"
              value={formData.channelBanner}
              onChange={handleChange}
              className={inputClass("channelBanner")}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3f3f3f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelPage;
