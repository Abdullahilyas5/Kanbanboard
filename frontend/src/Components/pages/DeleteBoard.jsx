import { useNavigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useMutation } from 'react-query';
import "./deleteboard.css"
import api from "../../API/api"
import { toast } from "react-toastify";


const DeleteBoard = () => {
    const navigate = useNavigate();

    const { refetchUser } = useContext(AuthContext);

    const location = useLocation();
    const boardId = location.state?.boardId;
    console.warn("board id is coming from board component ", boardId);


    const deleteBoardmutation = useMutation({
        mutationFn: ({ id }) => api.deleteBoard(id),
        onSuccess: (data) => {
            toast.success("Board deleted successfully!", {
                position: "top-right",
                autoClose: 1200,
                theme: "dark",
            });
            refetchUser();
            navigate("/homepage");
        },
        onError: (error) => {
            toast.error("Failed to delete board!", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });
            console.error("deletion error:", error.response?.data || error.message);
        },
    });


    return (
        <div className='delete-form-wrapper'>
            <form className='delete-form'
                onSubmit={(e) => {
                    e.preventDefault();
                    deleteBoardmutation.mutate({ id: boardId });
                }}>
                <h2 className='delete-board-title'>Delete Board</h2>
                <h3 className='delete-board-paragraph'>Do you really want to delete the board?</h3>
                <div className="dialog-btn">
                    <button className='delete-btn' type="submit" >Yes</button>
                    <button className='cancle-btn' type="button" onClick={() => {
                        navigate('/homepage');
                    }}>NO</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteBoard