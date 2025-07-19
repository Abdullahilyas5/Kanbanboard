// App.js
import { useContext, useState, useRef } from "react";
import Boards from "../Boards.jsx";
import Header from "../Header.jsx";
import { AuthContext } from '../../context/Authcontext.jsx';
import '../../App.css';
import MainComponent from "../MainComponent.jsx";

const Homepage = () => {
  const [title, setTitle] = useState('Kanban Board');
  const {
    setBoard,
    logostyles,
    setSliderbar,
    sliderbar
  } = useContext(AuthContext);
  const sidebarRef = useRef();

  return (
    <div>
      <div className="wrapper">
        <div className="left-side">
          {!sliderbar && (
            <div>
              <div className="Main" ref={sidebarRef}>
                <a className="title" ref={logostyles} href="/" >
                  <i className="ri-align-justify fa"></i>
                  <h2 className="logo">Kanban</h2>
                </a>
                <div className="sideBoard">
                  <Boards setSliderbar={setSliderbar} settitle={setTitle} sidebarRef={sidebarRef} Usersetboard={setBoard} />
                </div>
              </div>
            </div>
          )}
          {sliderbar && (
            <div className="second-sidebar">
              <i className="icon-sidebar ri-align-justify fa" onClick={() => {
                setSliderbar(false);
                sidebarRef.current.style.transform = "translateX(0%)";
              }}></i>
            </div>
          )}
        </div>
        <div className="right-side">
          <Header title={title} />
          <MainComponent/>
        </div>
      </div>
    </div>
  );
};

export default Homepage;