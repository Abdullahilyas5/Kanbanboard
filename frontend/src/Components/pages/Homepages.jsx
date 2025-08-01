import { useContext, useState, useEffect } from "react";
import Boards from "../Boards.jsx";
import Header from "../Header.jsx";
import { AuthContext } from '../../context/Authcontext.jsx';
import "./HomePage.css";
import MainComponent from "../MainComponent.jsx";
import { toast } from "react-toastify";

const Homepage = () => {
  const { boards, setSelectedBoard, selectedBoard, logostyles } = useContext(AuthContext);
  const [title, setTitle] = useState("Welcome to Kanban");

  // Sync title with selected board
  useEffect(() => {
    if (boards.length > 0 && selectedBoard) {
      const board = boards.find((b) => b._id === selectedBoard);
      setTitle(board?.title || "Welcome to Kanban");
    } else {
      setTitle("Welcome to Kanban");
    }
  }, [boards, selectedBoard]);

  // Show welcome toast only once
  useEffect(() => {
    const toastDismissed = localStorage.getItem("homepage-toast-dismissed");
    const toastId = "homepage-toast";
    if (!toastDismissed && !toast.isActive(toastId)) {
      toast.info("Welcome to the Homepage!", {
        toastId,
        onClose: () => {
          localStorage.setItem("homepage-toast-dismissed", "true");
        },
        autoClose: false,
        closeOnClick: true,
      });
    }
  }, []);

  return (
    <div>
      <div className="wrapper">
        <div className="left-side">
          <div className="main">
            <div className="title" ref={logostyles}>
              <div className="logo-container">
                <i className="ri-align-justify fa"></i>
                <h2 className="homepage-logo">Kanban</h2>
              </div>
            </div>
            <div className="sideboard">
              <Boards settitle={setTitle} Usersetboard={setSelectedBoard} />
            </div>
          </div>
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
``