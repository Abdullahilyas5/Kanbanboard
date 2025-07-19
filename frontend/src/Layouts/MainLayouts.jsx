import React from 'react';
import { Outlet } from 'react-router';
import App from '../App';

const MainLayouts = () => {
  return (
    <div>
      <App />
      <Outlet />
    </div>
  );
};

export default MainLayouts;