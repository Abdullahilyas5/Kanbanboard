// src/Layouts/MainLayouts.jsx
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
};

export default MainLayouts;
