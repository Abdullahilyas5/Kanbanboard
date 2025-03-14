import React, { useState } from "react";
import "./BoardCard.css";

function BoardCard(props)  {

  function handlenewtitle() {
    props.handletitle(props.title);
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
