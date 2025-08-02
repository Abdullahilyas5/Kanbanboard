// src/Layouts/MainLayouts.jsx
import { Outlet } from "react-router-dom";
import Homepage from "../Components/pages/Homepages";

const MainLayouts = () => {
  return (
    <div className="main-layout">
      <Homepage/>
      <Outlet />
    </div>
  );
};

export default MainLayouts;
