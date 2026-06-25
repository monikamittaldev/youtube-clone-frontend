import React, { useState } from "react";
import { SiYoutube } from "react-icons/si";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline, IoArrowBack } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineVideoCall } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";

const Header = ({ setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  // ── Get user from localStorage ────────────
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");
  const isLoggedIn = !!user;

  // ── Logout ────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("yt_token");
    localStorage.removeItem("yt_user");
    setShowUserMenu(false);
    navigate("/");
    window.location.reload();
  };

  // ── Search submit ─────────────────────────
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const handleClear = () => setSearchQuery("");

  // ── Mobile Search View ────────────────────
  if (mobileSearchOpen) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-2 h-14 bg-primary gap-2">
        <button
          className="icon-btn p-2 rounded-full"
          onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }}
        >
          <IoArrowBack className="text-2xl text-primary" />
        </button>

        <form className="relative flex-1" onSubmit={handleSearch}>
          {isFocused && (
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg" />
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus
            className={`search-input h-10 w-full rounded-l-full text-sm outline-none ${
              isFocused ? "pl-10 pr-10" : "px-4"
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
        </form>

        <button
          type="submit"
          onClick={handleSearch}
          className="search-btn h-10 text-primary border-theme border-l-0 rounded-r-full px-5 flex items-center justify-center -ml-3"
        >
          <FiSearch className="text-lg" />
        </button>
      </header>
    );
  }

  // ── Default Header View ───────────────────
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-primary">

      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="icon-btn p-2 rounded-full cursor-pointer"
        >
          <HiOutlineBars3 className="text-3xl text-primary" />
        </button>
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <SiYoutube className="text-red-600 text-3xl" />
          <span className="font-medium text-primary text-2xl -tracking-[0.07em]">
            YouTube
          </span>
          <sup className="text-[10px] text-secondary -translate-y-1">IN</sup>
        </Link>
      </div>

      {/* Center — Search */}
      <form className="hidden md:flex items-center w-[40%]" onSubmit={handleSearch}>
        <div className="relative w-full">
          {isFocused && (
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg" />
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`search-input h-10 w-full rounded-l-full text-sm outline-none ${
              isFocused ? "pl-10 pr-10" : "px-4"
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="search-btn h-10 text-primary border-theme border-l-0 rounded-r-full px-6 flex items-center justify-center"
        >
          <FiSearch className="text-lg" />
        </button>
      </form>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Mobile — Search icon */}
        <button
          className="icon-btn p-2 rounded-full md:hidden"
          onClick={() => setMobileSearchOpen(true)}
        >
          <FiSearch className="text-2xl text-primary" />
        </button>

        {isLoggedIn ? (
          <>
            {/* Create button — desktop */}
            <button
              onClick={() => navigate(`/channel/${user.channel}`)}
              className="create-btn hidden md:flex text-primary border-theme rounded-full px-4 py-1.5 text-sm items-center gap-2 cursor-pointer"
            >
              <MdOutlineVideoCall className="text-lg" />
              Create
            </button>

            {/* User Avatar — desktop + mobile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white font-bold text-sm cursor-pointer"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.username?.[0]?.toUpperCase()
                )}
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-11 z-50 w-56 bg-[#212121] border border-[#3f3f3f] rounded-xl shadow-xl py-2">

                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[#3f3f3f]">
                    <p className="text-sm font-medium text-primary">
                      {user.username}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Your channel */}
                  {user.channel && (
                    <button
                      onClick={() => {
                        navigate(`/channel/${user.channel}`);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-primary hover:bg-hover transition-colors"
                    >
                      <MdOutlineManageAccounts className="text-xl" />
                      Your Channel
                    </button>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-red-400 hover:bg-hover transition-colors"
                  >
                    <RiLogoutBoxLine className="text-xl" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Desktop — Sign In */}
            <div className="hidden md:block">
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2 text-[#3ea6ff] border border-[#3ea6ff] rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#263850] transition-colors"
              >
                <FaRegUserCircle className="text-xl" />
                Sign in
              </button>
            </div>

            {/* Mobile — User icon */}
            <button
              className="icon-btn p-2 rounded-full md:hidden"
              onClick={() => navigate("/auth")}
            >
              <FaRegUserCircle className="text-2xl text-primary" />
            </button>
          </>
        )}

      </div>
    </header>
  );
};

export default Header;