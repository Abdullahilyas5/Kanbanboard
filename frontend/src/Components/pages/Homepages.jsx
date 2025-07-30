// App.js
import { useContext, useState, useRef } from "react";
import Boards from "../Boards.jsx";
import Header from "../Header.jsx";
import { AuthContext } from '../../context/Authcontext.jsx';
import "./HomePage.css"
import MainComponent from "../MainComponent.jsx";
import { NavLink } from "react-router";

const Homepage = () => {


  












  const [title, setTitle] = useState('Kanban Board');
  const {
    setBoard,
    logostyles,
    setSliderbar,
    sliderbar
  } = useContext(AuthContext);
  const sidebarRef = useRef();
  

  const SideBarHandler = ()=>{

    console.log(sidebarRef.current.offsetWidth)
  }

  return (
    <div>
      <div className="wrapper">
        <div className="left-side"  ref={sidebarRef}>
          {!sliderbar && (

            <div className="main"  >
              <div className="title" ref={logostyles}>
                <div className="logo-container">
                  <i className="ri-align-justify fa"></i>
                  <h2 className="homepage-logo">Kanban</h2>
                </div>
              </div>
              <div className="sideboard">
                <Boards setSliderbar={setSliderbar} settitle={setTitle} sidebarRef={sidebarRef} Usersetboard={setBoard} />
              </div>

            </div>
          )}
        </div>
        <div className="right-side">
          <Header title={title} />
          <MainComponent />
        </div>
      </div>
    </div>
  );
};

export default Homepage;  