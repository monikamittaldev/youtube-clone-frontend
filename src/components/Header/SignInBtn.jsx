import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const SignInBtn = () => {
  return (
    <button className="signin-btn border-theme rounded-full px-3 py-1.5 flex items-center gap-2 font-medium transition-colors duration-200 cursor-pointer">
      <FaRegUserCircle className="text-xl" />
      Sign in
    </button>
  );
};

export default SignInBtn; 