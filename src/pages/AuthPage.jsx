import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SiYoutube } from "react-icons/si";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import usePost from "../hooks/usePost";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  // ── Custom hooks ──────────────────────────
  const { postData: loginPost, loading: loginLoading } = usePost(
    "http://localhost:5000/api/auth/login"
  );
  const { postData: registerPost, loading: registerLoading } = usePost(
    "http://localhost:5000/api/auth/register"
  );

  // ── Check token on mount ──────────────────
  useEffect(() => {
    const token = localStorage.getItem("yt_token");
    if (token) navigate("/");
  }, []);

  // ── Validate ──────────────────────────────
  const validateLogin = () => {
    const errs = {};
    if (!loginData.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(loginData.email))
      errs.email = "Enter a valid email";
    if (!loginData.password) errs.password = "Password is required";
    else if (loginData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const validateRegister = () => {
    const errs = {};
    if (!registerData.username.trim()) errs.username = "Username is required";
    else if (registerData.username.length < 5)
      errs.username = "Username must be at least 5 characters";
    if (!registerData.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(registerData.email))
      errs.email = "Enter a valid email";
    if (!registerData.password) errs.password = "Password is required";
    else if (registerData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  // ── Handle Avatar ─────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setRegisterData((prev) => ({ ...prev, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
  };

  // ── Handle Login ──────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validateLogin();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    try {
      const res = await loginPost(loginData);
      if (res.success) {
        localStorage.setItem("yt_token", res.token);
        localStorage.setItem("yt_user", JSON.stringify(res.user));
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ── Handle Register ───────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    const errs = validateRegister();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    try {
      const res = await registerPost({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        avatar: registerData.avatar
      });
      if (res.success) {
        toast.success("Account created! Please sign in.");
        setMode("login");
        setLoginData({ email: registerData.email, password: "" });
        setRegisterData({ username: "", email: "", password: "", avatar: null });
        setAvatarPreview(null);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ── Input class helper ────────────────────
  const inputClass = (field) => `
    w-full h-14 px-4 rounded-xl border
    ${errors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
    bg-white dark:bg-[#282828]
    text-[#202124] dark:text-white
    outline-none focus:border-[#1a73e8]
    transition-colors
  `;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#f0f4f9] dark:bg-[#1e1e1f]">
      <div className="w-full max-w-4xl bg-white dark:bg-[#282828] rounded-[28px] px-8 py-10 shadow-sm">
        <div className="flex flex-col md:flex-row gap-12">

          {/* ── LEFT ── */}
          <div className="md:w-2/5">
            <div className="flex items-center gap-2 mb-8">
              <SiYoutube className="text-red-600 text-4xl" />
              <span className="text-2xl font-medium text-[#202124] dark:text-white">
                YouTube
              </span>
            </div>
            <h1 className="text-[38px] leading-tight font-normal text-[#202124] dark:text-white mb-4">
              {mode === "login" ? "Sign in" : "Create account"}
            </h1>
            <p className="text-[#5f6368] dark:text-gray-400 text-base">
              {mode === "login" ? "to continue to YouTube" : "Join YouTube today"}
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div className="md:w-3/5">

            {/* ── LOGIN FORM ── */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4" noValidate>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((p) => ({ ...p, password: e.target.value }))
                    }
                    className={inputClass("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-11 bg-[#1a73e8] hover:bg-[#1765cc] text-white rounded-full font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loginLoading ? "Signing in..." : "Sign In"}
                </button>

                <div className="mt-6 text-center">
                  <span className="text-[#5f6368] dark:text-gray-400">
                    Don't have an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => { setMode("register"); setErrors({}); }}
                    className="ml-2 text-[#1a73e8] font-medium hover:underline"
                  >
                    Create account
                  </button>
                </div>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4" noValidate>

                {/* Avatar Upload */}
                <div className="flex justify-center mb-4">
                  <label className="relative cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#3a3a3a] flex items-center justify-center">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm text-gray-500">Upload</span>
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

                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData((p) => ({ ...p, username: e.target.value }))
                    }
                    className={inputClass("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData((p) => ({ ...p, password: e.target.value }))
                    }
                    className={inputClass("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full h-11 bg-[#1a73e8] hover:bg-[#1765cc] text-white rounded-full font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {registerLoading ? "Creating..." : "Create Account"}
                </button>

                <div className="mt-6 text-center">
                  <span className="text-[#5f6368] dark:text-gray-400">
                    Already have an account?
                  </span>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setErrors({}); }}
                    className="ml-2 text-[#1a73e8] font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;