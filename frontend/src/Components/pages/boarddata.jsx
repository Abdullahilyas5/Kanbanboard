import React, { useState, useContext } from 'react';
import './boarddata.css';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { useMutation } from 'react-query';
import { AuthContext } from '../../context/Authcontext';
import { toast } from "react-toastify";
import { useRef } from 'react';

const Boarddata = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ title: ''});
    const { refetchUser } = useContext(AuthContext);
     const nameRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        navigate('/homepage');
    };

    const createBoardMutation = useMutation({
        mutationFn: (details) => api.createBoard(details),
        onSuccess: () => {
            toast.success("🎉 Board created!", {
                position: "top-right",
                autoClose: 1500,
                theme: "colored",
                style: {
                    background: "#e0ffe0",
                    color: "#1a7f37",
                    fontWeight: "bold",
                },
            });
            refetchUser?.();
            navigate('/');
        },
        onError: (error) => {
            console.error("Board creation error:", error);
            //  error.response?.data ||
        }
    });
    console.log("Boarddata " , details);
    const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current ? nextRef.current.focus() : createBoardMutation.mutate(details);
    }
  };

    return (
        <div className="modal-board-wrapper">
            <form
                className="board-form-container"
                onSubmit={(e) => {
                    e.preventDefault();
                    createBoardMutation.mutate(details);
                }}
            >
                <i className="ri-close-line close-icon" onClick={handleCancel}></i>
                <h1 className="form-heading">Create Board</h1>

                <input
                    className="input-field"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={details.title}
                    onChange={handleChange}
                    autoFocus
                    ref={nameRef}
                    onKeyDown={(e) => handleKeyDown(e, null)}
                    required
                />
                <button type="submit" className="submit-btn">{createBoardMutation.isLoading ? "Creating board..." : "Create board"}</button>
            </form>
            <div className="modal-dismiss-area" onClick={handleCancel}></div>
        </div>
    );
};

export default Boarddata;
