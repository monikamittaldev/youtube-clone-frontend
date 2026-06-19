import React from "react";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
      className="w-screen h-screen"
    >
      <Header />
    </div>
  );
};

export default App;
