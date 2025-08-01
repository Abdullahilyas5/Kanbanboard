import { Outlet } from 'react-router';
import App from '../App';
import Homepage from '../Components/pages/Homepages.jsx';

const MainLayouts = () => {
  return (
    <div>
      <App/>
      <Homepage />
      <Outlet />
    </div>
  );
};

export default MainLayouts;