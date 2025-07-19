import React, { useState, useContext } from 'react';
import "./boarddata.css";
import { useNavigate } from 'react-router-dom';

import api from '../../API/api';
// import PrivateRoute  from '../../context/Privateroute'
import { AuthContext } from '../../context/Authcontext'
const boarddata = () => {
    const navigate = useNavigate();
    const [details, setdetails] = useState({ title: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const { board, setBoard, refresh, setrefresh, task, settask } = useContext(AuthContext);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setdetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlecancle = () => {
        navigate(-1);
    };


    const handleboarddata = async (e) => {
        try {
            e.preventDefault();
           const response = await api.createboard(details)
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log("Board is stored successfully!");

            } else {
                setError(data.message);
                console.log("Error:", data);
            }

            setBoard((prev) => [...(prev || []), data]);
            if (refresh) {
                setrefresh(false);
            } else {
                setrefresh(true);
            }
            settask((prev) => [...(prev || []), data.tasks]);





            navigate('/'); // Pass state to trigger re-fetch

        } catch (error) {
            setError(error.message);
            console.error('create-board-front:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <PrivateRoute>
        <div className='parent'>
            <form action="/create-board" method='post' className='board-details' onSubmit={handleboarddata}>
                <i className="ri-close-line" onClick={handlecancle}></i>
                <h1>Create Board</h1>
                <input className='create-ip' type="text" name="title" placeholder="Title"
                    value={details.title}
                    onChange={handlechange} autoFocus required />
                <button type="submit" className='create-btn'>Create Board</button>
            </form>
            <div className="form-closer" onClick={handlecancle}></div>

        </div>


        // </PrivateRoute>

    );
};

export default boarddata;