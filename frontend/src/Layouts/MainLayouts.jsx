// src/Layouts/MainLayouts.jsx
import React from "react";
import { Outlet } from "react-router-dom";
// import your Header, Sidebar, Footer, etc. here if you have them

const MainLayouts = () => {
  return (
    <div className="app-container">
      {/* <Header /> */}
      {/* <Sidebar /> */}

      <main>
        <Outlet />  {/* <-- this will render Homepage, UpdateBoard, DeleteBoard, etc. */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayouts;
