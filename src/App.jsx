import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideSlider/Sidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useIsMobile from "./hooks/useIsMobile";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSidebarOpen(true); // Home page → open sidebar
    } else {
      setSidebarOpen(false); // Other pages → closed sidebar
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
      className="w-screen h-screen overflow-x-hidden"
    >
      <ToastContainer />
      <Header setSidebarOpen={setSidebarOpen} />
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Outlet context={{ sidebarOpen }} />
    </div>
  );
};

export default App;
