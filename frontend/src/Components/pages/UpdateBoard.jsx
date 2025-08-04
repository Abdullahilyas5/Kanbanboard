import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router';
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../../API/api";
import { AuthContext } from '../../context/Authcontext';

import "./UpadateBoardForm.css";

const UpdateBoard = () => {
  const [info, setInfo] = useState({ title: '' });
  const navigate = useNavigate();
  const { refetchUser } = useContext(AuthContext);
  const location = useLocation();
  const boardId = location.state?.boardId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/homepage');
  };

  const updateBoardMutation = useMutation({
    mutationFn: ({ info, id }) => api.updateBoard(info, id),
    onSuccess: () => {
      toast.info("Board updated successfully!", {
        position: "bottom-right",
        autoClose: 1200,
        theme: "light",
      });
      refetchUser?.();
      navigate("/homepage");
    },
    onError: () => {
      toast.error("Failed to update board!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "light",
      });
    },
  });

  return (
    <div className="modal-overlay">
      <form
        className="modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateBoardMutation.mutate({ info, id: boardId });
        }}
      >
        <MdOutlineCancel className="modal-close-icon" onClick={handleCancel} title="Close" />
        <h2 className="modal-title">Update Board</h2>
        <input
          type="text"
          name="title"
          required
          value={info.title}
          onChange={handleChange}
          className="modal-input"
          placeholder="Enter board title"
          autoFocus
        />
        <button className="modal-submit-btn" type="submit">
          {updateBoardMutation.isLoading ? "Updating..." : "Update Board"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBoard;
