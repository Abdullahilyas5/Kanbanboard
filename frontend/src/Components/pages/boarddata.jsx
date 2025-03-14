import React, { useState } from 'react';
import "./boarddata.css";
import { useNavigate } from 'react-router-dom';

const boarddata = () => {
    const navigate = useNavigate();
    const [details, setdetails] = useState({ title: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const response = await fetch('http://localhost:3000/create-board', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(details)
            });
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log("Board is stored successfully!");
                navigate('/', { state: { refresh: true } }); // Pass state to trigger re-fetch
                
            } else {
                setError(data.message);
                console.log("Error:", data);
            }
        } catch (error) {
            setError(error.message);
            console.error('create-board-front:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='parent'>
            <form action="/create-board" method='post' className='board-details' onSubmit={handleboarddata}>
                <i className="ri-close-line" onClick={handlecancle}></i>
                <h1>Create Board</h1>
                <input type="text" name="title" placeholder="title"
                    value={details.title}
                    onChange={handlechange} autoFocus required />
                <button type="submit" disabled={loading}>Create Board</button>
            </form>
        </div>
    );
};

export default boarddata;