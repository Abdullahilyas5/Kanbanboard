import React, { useContext } from 'react'
import { useMutation } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MdOutlineCancel } from "react-icons/md";
import "../pages/UpdateBoardForm.css"
import { useLocation } from 'react-router';
import { toast } from "react-toastify";

import api from "../../API/api"
import { AuthContext } from '../../context/Authcontext';
const UpdateBoard = () => {
    const [info, setinfo] = useState({ title: '' });
    const navigate = useNavigate();

    const { refetchUser } = useContext(AuthContext);

    const location = useLocation();
    const boardId = location.state?.boardId;
    console.warn("board id is coming from board component ", boardId);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setinfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlecancle = () => {
        navigate('/homepage');
    };


    const updateBoardmutation = useMutation({
        mutationFn: ({ info, id }) => api.updateBoard(info, id),
        onSuccess: (data) => {
            toast.info("Board updated successfully!", {
                position: "bottom-right",
                autoClose: 1200,
                theme: "light",
                style: {
                    background: "#e6f0ff",
                    color: "#1a3d7c",
                    fontWeight: "bold",
                },
                icon: "✏️",
            });
            refetchUser();
            navigate("/homepage");
        },
        onError: (error) => {
            toast.error("Failed to update board!", {
                position: "bottom-right",
                autoClose: 2000,
                theme: "light",
            });
            console.error("Error updating board:", error);
        },
    });
    return (
        <div id='update-container'>
            <form action="/updateBoard" method='put' className='update-form' onSubmit={(e) => {
                e.preventDefault();
                updateBoardmutation.mutate({ info, id: boardId });
            }}>
                <i className="ri-close-line uclose-icons" onClick={handlecancle}></i>

                <h1 className='update-board-heading'>Update Board</h1>
                <input className='update-board-input' type="text" name="title" required placeholder="Title" value={info.title} onChange={handlechange} />
                <button
                    className='update-board-button'
                    type='submit'
                >
                    {updateBoardmutation.isLoading ? "Updating..." : "Update Board"}
                </button>
            </form>
        </div >
    )
}

export default UpdateBoard