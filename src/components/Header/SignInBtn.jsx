import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignInBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/auth")}
      className="signin-btn border-theme rounded-full px-3 py-1.5 flex items-center gap-2 font-medium transition-colors duration-200 cursor-pointer"
    >
      <FaRegUserCircle className="text-xl" />
      Sign in
    </button>
  );
};

export default SignInBtn;
