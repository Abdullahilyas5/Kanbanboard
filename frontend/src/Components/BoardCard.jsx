import React, { useContext, useState } from "react";
import "./BoardCard.css";
import { AuthContext } from "../context/Authcontext.jsx";

function BoardCard(props)  {

  const auth = useContext(AuthContext);
  // console.log("Current selected board ID is:", auth.SelectedBoard);

  function handlenewtitle() {
    props.handletitle(props.title);
    auth.setSelectedBoard(props.id);
    // console.log("selected board id is : ", auth.SelectedBoard);
    // console.log("board id is : ", props.id);
  }
  return (
    <div className="btn-in">
      <i class="ri-dashboard-line"></i>
      <button className="btn-2" onClick={handlenewtitle}>
        {props.title}
      </button>
    </div>
  );
}

export default BoardCard;
