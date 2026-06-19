import React, { useState } from "react";
import { SiYoutube } from "react-icons/si";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import SignInBtn from "./SignInBtn";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-primary">
      {/* Left — Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button className="icon-btn p-2 rounded-full cursor-pointer">
          <HiOutlineBars3 className="text-3xl text-primary" />
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <SiYoutube className="text-red-600 text-3xl" />

          <span className="font-medium text-primary text-2xl -tracking-[0.07em]">
            YouTube
          </span>

          <sup className="text-[10px] text-secondary -translate-y-1">IN</sup>
        </div>
      </div>

      {/* Center — Search */}
      <div className="flex items-center w-[40%]">
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
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 icon-btn p-1 rounded-full"
            >
              <IoCloseOutline className="text-primary text-xl" />
            </button>
          )}
        </div>

        <button className="search-btn h-10 text-primary border-theme border-l-0 rounded-r-full px-6 flex items-center justify-center">
          <FiSearch className="text-lg" />
        </button>
      </div>
      {/* Right — Create + Sign In */}
      <div className="flex items-center gap-3">
        <button className="create-btn text-primary border-theme rounded-full px-4 py-1.5 text-sm flex items-center gap-2 cursor-pointer">
          <FaPlus className="text-sm" />
          Create
        </button>

        <SignInBtn />
      </div>
    </header>
  );
};

export default Header;
