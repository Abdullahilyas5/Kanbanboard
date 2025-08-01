import React, { useState, useContext } from 'react';
import "./boarddata.css";
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { useMutation } from 'react-query';
import { AuthContext } from '../../context/Authcontext';
import { toast } from "react-toastify";

const Boarddata = () => {
    const navigate = useNavigate();
    const [details, setdetails] = useState({ title: '' });
    const { refetchUser } = useContext(AuthContext);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setdetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlecancle = () => {
        navigate('/homepage');
    };

    const createBoardMutation = useMutation({
        mutationFn: (details) => api.createBoard(details),
        onSuccess: (data) => {
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
            refetchUser();
            navigate("/");
        },
        onError: (error) => {
            console.error("Signup error:", error.response?.data || error.message);
        },
    });

    return (
        <div className='wrapper-form-create-board'>
            <form action="/createBoard" method='post' className='board-details' onSubmit={(e) => {
                e.preventDefault();
                createBoardMutation.mutate(details);
            }}>
                <i className="ri-close-line" onClick={handlecancle}></i>
                <h1 className='board-form-heading'>Create Board</h1>
                <input className='create-form-input' type="text" name="title" placeholder="Title"
                    value={details.title}
                    onChange={handlechange} autoFocus required />
                <button type="submit" className='create-form-btn'>Create Board</button>
            </form>
            <div className='cancle-box' onClick={handlecancle}></div>
        </div>
    );
};

export default Boarddata;